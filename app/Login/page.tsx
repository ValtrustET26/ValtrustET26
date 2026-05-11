export default function Login() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white">
      <>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />

        <title>Valtrust Login</title>

        <div className="absolute -bottom-28 -left-28 w-72 h-72 rounded-full bg-gradient-to-br from-[#2563eb] to-[#60a5fa] z-0" />

        <div className="relative z-10 min-h-screen flex flex-col md:flex-row">
          
          <div className="w-full md:w-1/2 min-h-screen flex items-center justify-center px-6 sm:px-10 lg:px-24 py-10">
            
            <div className="w-full max-w-[400px] -mt-6 ml-25">
              
              <div className="flex items-center gap-2 mb-8 -ml-40">
                <h1 className="text-3xl font-extrabold text-black">
                  <span className="text-[#0d3d66]">V</span>altrust
                </h1>
              </div>

              <div className="mb-7">
                <h2 className="block text-4xl sm:text-5xl font-light text-black leading-tight mb-2">
                  Welcome Back
                </h2>

                <p className="text-gray-500">
                  Login to continue your experience
                </p>
              </div>

              <form className="space-y-4">
                
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Email or username
                  </label>

                  <input
                    type="text"
                    placeholder="Enter your email"
                    className="w-full h-11 px-4 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#4ea2ff] text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Password
                  </label>

                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full h-11 px-4 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#4ea2ff] text-black"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm">
                  
                  <label className="flex items-center text-gray-500">
                    <input type="checkbox" className="mr-2" />
                    Remember me
                  </label>

                  <a
                    href="#"
                    className="text-[#2f8fb6] hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>

                <button
                  type="submit"
                  className="w-full h-11 rounded-md bg-[#5aa8ff] hover:bg-[#4696ee] text-white font-semibold transition"
                >
                  LOGIN
                </button>
              </form>

              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-gray-300" />
                <span className="text-gray-400 text-sm">OR</span>
                <div className="flex-1 h-px bg-gray-300" />
              </div>

              <div className="space-y-3">
                
                <button className="w-full h-11 border border-gray-300 bg-white rounded-md flex items-center justify-center gap-3 hover:bg-gray-50 transition">
                  
                  <img
                    src="https://www.google.com/favicon.ico"
                    alt="Google"
                    className="w-4 h-4"
                  />

                  <span className="text-sm font-medium text-gray-800">
                    LOGIN WITH GOOGLE
                  </span>
                </button>

                <button className="w-full h-11 rounded-md bg-[#252d8d] hover:bg-[#1e236e] text-white flex items-center justify-center gap-3 transition">
                  
                  <span className="text-lg font-bold">f</span>

                  <span className="text-sm font-medium">
                    LOGIN WITH FACEBOOK
                  </span>
                </button>
              </div>

              <div className="mt-6 text-center">
                
                <p className="text-sm text-gray-600">
                  Don't have an account?

                  <a
                    href="#"
                    className="text-[#2f8fb6] font-semibold hover:underline ml-1"
                  >
                    Register here
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="hidden md:flex md:w-1/2 h-screen items-center justify-center relative overflow-hidden">
            
            <div className="absolute -top-40 -right-28 w-[720px] h-[720gpx] rounded-full bg-gradient-to-br from-[#163d96] via-[#2458d4] to-[#3f95ff] border-[3px] border-[#00a2ff]" />

            <div className="absolute -bottom-24 -right-16 w-[320px] h-[320px] rounded-full bg-[#14337e]" />

            <div className="relative z-10 text-center text-white">
              
              <h1 className="text-5xl lg:text-7xl font-extrabold mb-8 -mt-40 ml-30">
                Valtrust
              </h1>

              <p className="text-xl lg:text-2xl text-blue-200 ml-30 ">
                Glad to have you here!
              </p>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}