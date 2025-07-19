import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  Github,
  Chrome,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            Create Your Account
          </CardTitle>
          <CardDescription>
            Join Art Guard to protect your creative work and manage professional
            commissions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Social Signup Options */}
          <div className="space-y-3">
            <Button variant="outline" className="w-full">
              <Chrome className="h-4 w-4 mr-2" />
              Sign up with Google
            </Button>
            <Button variant="outline" className="w-full">
              <Github className="h-4 w-4 mr-2" />
              Sign up with GitHub
            </Button>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or create account with email
              </span>
            </div>
          </div>

          {/* Signup Form */}
          <form className="space-y-4">
            {/* Name Field */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-foreground"
              >
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Your full name"
                  className="pl-9"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-9"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-foreground"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  className="pl-9 pr-9"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-foreground"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className="pl-9 pr-9"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Password Requirements */}
            <div className="text-xs text-muted-foreground space-y-1">
              <p className="font-medium">Password must contain:</p>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3 text-green-600" />
                <span>At least 8 characters</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3 text-muted-foreground" />
                <span>One uppercase letter</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3 text-muted-foreground" />
                <span>One number or special character</span>
              </div>
            </div>

            {/* Terms and Privacy */}
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <input
                  id="terms"
                  type="checkbox"
                  className="h-4 w-4 mt-0.5 rounded border border-border text-primary focus:ring-primary"
                  required
                />
                <label htmlFor="terms" className="text-sm text-foreground">
                  I agree to the{" "}
                  <Link to="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <div className="flex items-start space-x-2">
                <input
                  id="marketing"
                  type="checkbox"
                  className="h-4 w-4 mt-0.5 rounded border border-border text-primary focus:ring-primary"
                />
                <label htmlFor="marketing" className="text-sm text-foreground">
                  I'd like to receive product updates and art protection tips
                  via email
                </label>
              </div>
            </div>

            {/* Create Account Button */}
            <Button type="submit" className="w-full">
              Create Account
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </form>

          {/* Sign In Link */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/auth/login"
                className="font-medium text-primary hover:underline"
              >
                Sign in to Art Guard
              </Link>
            </p>
          </div>

          {/* Security Notice */}
          <div className="text-center pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Your personal information is encrypted and secure.{" "}
              <Link to="/security" className="text-primary hover:underline">
                Learn about our security
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* What You Get */}
      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <h3 className="font-semibold text-foreground mb-3 text-center">
          What you get with Art Guard:
        </h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
            <span>Professional portfolio hosting with AI protection</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
            <span>Streamlined commission management system</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
            <span>Automatic copyright registration and protection</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
            <span>AI dataset monitoring and takedown services</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
