import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; 
import { useAuth } from "../../hooks/useAuth"; 
import styles from "./Login.module.css"; 

export default function Login() {
  const { loginMutation } = useAuth();
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        navigate("/dashboard"); 
      },
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Sign In</h1>
          <p className={styles.subtitle}>Welcome back to MyAuth App</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          
          {/* --- EMAIL --- */}
          <div className={styles.inputGroup}>
            <label className={styles.label}>Email Address</label>
            <input
              type="email"
              placeholder="name@example.com"
              className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && (
              <span className={styles.errorMessage}>{errors.email.message}</span>
            )}
          </div>

          {/* --- PASSWORD --- */}
          <div className={styles.inputGroup}>
            <label className={styles.label}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
              {...register("password", {
                required: "Password is required",
                minLength: {
                    value: 6, 
                    message: "Password must be at least 6 characters"
                }
              })}
            />
            {errors.password && (
              <span className={styles.errorMessage}>{errors.password.message}</span>
            )}
          </div>

          {/* Lỗi từ API */}
          {loginMutation.isError && (
            <div className={styles.errorBox}>
              {loginMutation.error?.response?.data?.message || "Login failed. Please try again."}
            </div>
          )}

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className={styles.button}
          >
            {loginMutation.isPending ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}