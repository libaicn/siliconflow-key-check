import React, { useState } from "react";

interface UserInfo {
  id: string;
  name: string;
  email: string;
  created_at: string;
  totalBalance: string;
}

const App: React.FC = () => {
  const [apiKey, setApiKey] = useState<string>("");
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validateApiKey = async () => {
    if (!apiKey) {
      setError("API Key is required");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("https://api.siliconflow.cn/v1/user/info", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error("Invalid API Key");
      }
      const resp = await response.json();
      const data: UserInfo = resp.data;
      setUserInfo(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min- bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          SiliconFlow API Key Validator
        </h1>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="apiKey"
              className="block text-sm font-medium text-gray-700"
            >
              API Key
            </label>
            <input
              type="text"
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your API Key"
            />
          </div>
          <button
            onClick={validateApiKey}
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isLoading ? "Validating..." : "Validate Key"}
          </button>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {userInfo && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
            <h2 className="text-lg font-semibold text-green-800">
              User Information
            </h2>
            <div className="mt-2 space-y-1">
              {/* <p className="text-sm text-green-700">
                <span className="font-medium">ID:</span> {userInfo.id}
              </p>
              <p className="text-sm text-green-700">
                <span className="font-medium">Name:</span> {userInfo.name}
              </p>
              <p className="text-sm text-green-700">
                <span className="font-medium">Email:</span> {userInfo.email}
              </p> */}
              <p className="text-sm text-green-700">
                <span className="font-medium">余额:</span>{" "}
                {userInfo.totalBalance}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
