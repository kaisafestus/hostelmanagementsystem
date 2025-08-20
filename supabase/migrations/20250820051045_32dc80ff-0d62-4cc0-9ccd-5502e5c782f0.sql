-- Enable RLS on all existing tables
ALTER TABLE public.complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.complaint_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.room_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.room_change_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for existing tables
-- Complaints policies
CREATE POLICY "Students can view their own complaints" ON public.complaints
  FOR SELECT USING (student_id = auth.uid());

CREATE POLICY "Students can create complaints" ON public.complaints
  FOR INSERT WITH CHECK (student_id = auth.uid());

CREATE POLICY "Students can update their own complaints" ON public.complaints
  FOR UPDATE USING (student_id = auth.uid());

CREATE POLICY "Admins can view all complaints" ON public.complaints
  FOR ALL USING (is_admin());

-- Complaint comments policies
CREATE POLICY "Users can view comments on complaints they're involved in" ON public.complaint_comments
  FOR SELECT USING (
    user_id = auth.uid() OR 
    EXISTS (SELECT 1 FROM complaints WHERE id = complaint_id AND student_id = auth.uid()) OR
    is_admin()
  );

CREATE POLICY "Users can create comments" ON public.complaint_comments
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Payments policies
CREATE POLICY "Students can view their own payments" ON public.payments
  FOR SELECT USING (student_id = auth.uid());

CREATE POLICY "Admins can manage all payments" ON public.payments
  FOR ALL USING (is_admin());

-- Room assignments policies
CREATE POLICY "Students can view their own assignments" ON public.room_assignments
  FOR SELECT USING (student_id = auth.uid());

CREATE POLICY "Admins can manage all assignments" ON public.room_assignments
  FOR ALL USING (is_admin());

-- Room change requests policies
CREATE POLICY "Students can view and create their own requests" ON public.room_change_requests
  FOR SELECT USING (student_id = auth.uid());

CREATE POLICY "Students can create change requests" ON public.room_change_requests
  FOR INSERT WITH CHECK (student_id = auth.uid());

CREATE POLICY "Admins can manage all change requests" ON public.room_change_requests
  FOR ALL USING (is_admin());

-- Rooms policies
CREATE POLICY "Everyone can view available rooms" ON public.rooms
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage rooms" ON public.rooms
  FOR ALL USING (is_admin());

-- Students policies
CREATE POLICY "Students can view their own profile" ON public.students
  FOR SELECT USING (id = auth.uid());

CREATE POLICY "Students can update their own profile" ON public.students
  FOR UPDATE USING (id = auth.uid());

CREATE POLICY "Admins can manage all students" ON public.students
  FOR ALL USING (is_admin());

-- Create additional tables for comprehensive functionality

-- Notices table
CREATE TABLE public.notices (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  type TEXT CHECK (type IN ('general', 'urgent', 'maintenance', 'event')) DEFAULT 'general',
  created_by UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true
);

ALTER TABLE public.notices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can view active notices" ON public.notices
  FOR SELECT USING (is_active = true AND (expires_at IS NULL OR expires_at > now()));

CREATE POLICY "Admins can manage notices" ON public.notices
  FOR ALL USING (is_admin());

-- Staff table
CREATE TABLE public.staff (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  employee_id TEXT UNIQUE NOT NULL,
  position TEXT NOT NULL,
  department TEXT,
  hire_date DATE,
  salary DECIMAL(10,2),
  contact_info JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.staff ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff can view their own profile" ON public.staff
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all staff" ON public.staff
  FOR ALL USING (is_admin());

-- Maintenance requests table
CREATE TABLE public.maintenance_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  room_id UUID NOT NULL,
  student_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  priority TEXT CHECK (priority IN ('low', 'medium', 'high', 'urgent')) DEFAULT 'medium',
  status TEXT CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')) DEFAULT 'pending',
  assigned_to UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ
);

ALTER TABLE public.maintenance_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view their own maintenance requests" ON public.maintenance_requests
  FOR SELECT USING (student_id = auth.uid());

CREATE POLICY "Students can create maintenance requests" ON public.maintenance_requests
  FOR INSERT WITH CHECK (student_id = auth.uid());

CREATE POLICY "Admins can manage all maintenance requests" ON public.maintenance_requests
  FOR ALL USING (is_admin());

-- Meal plans table
CREATE TABLE public.meal_plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price_per_month DECIMAL(10,2) NOT NULL,
  meals_included JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.meal_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can view active meal plans" ON public.meal_plans
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage meal plans" ON public.meal_plans
  FOR ALL USING (is_admin());

-- Student meal subscriptions table
CREATE TABLE public.student_meal_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL,
  meal_plan_id UUID NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status TEXT CHECK (status IN ('active', 'expired', 'cancelled')) DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.student_meal_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view their own meal subscriptions" ON public.student_meal_subscriptions
  FOR SELECT USING (student_id = auth.uid());

CREATE POLICY "Admins can manage all meal subscriptions" ON public.student_meal_subscriptions
  FOR ALL USING (is_admin());

-- Visitor logs table
CREATE TABLE public.visitor_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL,
  visitor_name TEXT NOT NULL,
  visitor_contact TEXT,
  purpose TEXT,
  check_in_time TIMESTAMPTZ NOT NULL DEFAULT now(),
  check_out_time TIMESTAMPTZ,
  approved_by UUID,
  status TEXT CHECK (status IN ('pending', 'approved', 'rejected', 'checked_out')) DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.visitor_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view their own visitor logs" ON public.visitor_logs
  FOR SELECT USING (student_id = auth.uid());

CREATE POLICY "Students can create visitor requests" ON public.visitor_logs
  FOR INSERT WITH CHECK (student_id = auth.uid());

CREATE POLICY "Admins can manage all visitor logs" ON public.visitor_logs
  FOR ALL USING (is_admin());

-- Emergency contacts table
CREATE TABLE public.emergency_contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  department TEXT,
  is_available_24_7 BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.emergency_contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can view emergency contacts" ON public.emergency_contacts
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage emergency contacts" ON public.emergency_contacts
  FOR ALL USING (is_admin());

-- Internet usage tracking
CREATE TABLE public.internet_usage (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL,
  room_id UUID NOT NULL,
  usage_date DATE NOT NULL,
  data_consumed_mb BIGINT DEFAULT 0,
  bandwidth_limit_mb BIGINT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.internet_usage ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view their own internet usage" ON public.internet_usage
  FOR SELECT USING (student_id = auth.uid());

CREATE POLICY "Admins can manage all internet usage" ON public.internet_usage
  FOR ALL USING (is_admin());

-- Automatic payment tracking function
CREATE OR REPLACE FUNCTION public.track_payment_due()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  -- When a room assignment is created, create pending payment records
  INSERT INTO payments (
    student_id,
    room_id,
    amount,
    payment_date,
    payment_method,
    status,
    recorded_by,
    academic_year,
    semester,
    notes
  ) VALUES (
    NEW.student_id,
    NEW.room_id,
    (SELECT price_per_semester FROM rooms WHERE id = NEW.room_id),
    CURRENT_DATE + INTERVAL '30 days', -- Due in 30 days
    'pending',
    'pending',
    NEW.student_id,
    NEW.academic_year,
    NEW.semester,
    'Auto-generated payment due for room assignment'
  );
  
  RETURN NEW;
END;
$$;

-- Create trigger for automatic payment tracking
CREATE TRIGGER trigger_track_payment_due
  AFTER INSERT ON room_assignments
  FOR EACH ROW
  EXECUTE FUNCTION track_payment_due();

-- Update function for updating timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add update triggers to all tables
CREATE TRIGGER update_notices_updated_at BEFORE UPDATE ON public.notices FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_staff_updated_at BEFORE UPDATE ON public.staff FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_maintenance_requests_updated_at BEFORE UPDATE ON public.maintenance_requests FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_meal_plans_updated_at BEFORE UPDATE ON public.meal_plans FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_student_meal_subscriptions_updated_at BEFORE UPDATE ON public.student_meal_subscriptions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_visitor_logs_updated_at BEFORE UPDATE ON public.visitor_logs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_emergency_contacts_updated_at BEFORE UPDATE ON public.emergency_contacts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();