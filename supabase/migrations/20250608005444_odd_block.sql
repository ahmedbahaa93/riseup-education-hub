/*
  # Add shopping cart and orders functionality

  1. New Tables
    - `orders` table for tracking purchases
    - `order_items` table for order line items
    
  2. Changes
    - Add order tracking and payment status
    - Support for multiple items per order
    
  3. Security
    - Enable RLS on all tables
    - Add policies for user access
*/

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  total_amount numeric(10,2) NOT NULL DEFAULT 0,
  currency text DEFAULT 'USD',
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'cancelled', 'refunded')),
  payment_method text,
  payment_status text DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')),
  stripe_session_id text,
  stripe_payment_intent_id text,
  billing_address jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  quantity integer DEFAULT 1 CHECK (quantity > 0),
  unit_price numeric(10,2) NOT NULL,
  total_price numeric(10,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Create policies for orders
CREATE POLICY "Users can view their own orders" ON orders
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create their own orders" ON orders
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own orders" ON orders
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid());

-- Create policies for order_items
CREATE POLICY "Users can view their own order items" ON order_items
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_items.order_id 
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create their own order items" ON order_items
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_items.order_id 
      AND orders.user_id = auth.uid()
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS orders_user_id_idx ON orders(user_id);
CREATE INDEX IF NOT EXISTS orders_status_idx ON orders(status);
CREATE INDEX IF NOT EXISTS order_items_order_id_idx ON order_items(order_id);
CREATE INDEX IF NOT EXISTS order_items_course_id_idx ON order_items(course_id);

-- Function to update order total
CREATE OR REPLACE FUNCTION update_order_total()
RETURNS trigger AS $$
BEGIN
  UPDATE orders 
  SET total_amount = (
    SELECT COALESCE(SUM(total_price), 0)
    FROM order_items 
    WHERE order_id = COALESCE(NEW.order_id, OLD.order_id)
  ),
  updated_at = now()
  WHERE id = COALESCE(NEW.order_id, OLD.order_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create triggers to update order totals
DROP TRIGGER IF EXISTS update_order_total_on_insert ON order_items;
CREATE TRIGGER update_order_total_on_insert
  AFTER INSERT ON order_items
  FOR EACH ROW EXECUTE FUNCTION update_order_total();

DROP TRIGGER IF EXISTS update_order_total_on_update ON order_items;
CREATE TRIGGER update_order_total_on_update
  AFTER UPDATE ON order_items
  FOR EACH ROW EXECUTE FUNCTION update_order_total();

DROP TRIGGER IF EXISTS update_order_total_on_delete ON order_items;
CREATE TRIGGER update_order_total_on_delete
  AFTER DELETE ON order_items
  FOR EACH ROW EXECUTE FUNCTION update_order_total();