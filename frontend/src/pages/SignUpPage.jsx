import { useAuthUser } from "../auth/useAuthUser.js";
import { useNavigate, Link } from "react-router";
import { useEffect } from "react";

function AuthenticationPage() {
  const { token, signup, loading, formData, setFormData } = useAuthUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div className="hero min-h-screen bg-base-200">
      <form
        className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
        onSubmit={signup}
      >
        <legend className="fieldset-legend text-2xl">Sign up</legend>

        <label className="label">Username</label>
        <input
          type="text"
          className="input"
          placeholder="username"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />

        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          placeholder="Password"
          autoComplete="on"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />

        <button
          className="btn btn-neutral mt-4"
          type="submit"
          disabled={
            !formData.username ||
            !formData.email ||
            !formData.password ||
            loading
          }
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            <>Sign up</>
          )}
        </button>

        <div className="flex items-center justify-center mt-4">
          <span className="font-extrabold text-xs">
            Already have an account?
          </span>
          <Link to={"/signin"} className="btn btn-link">
            <span>Sign in instead</span>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default AuthenticationPage;
