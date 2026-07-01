
const JUDGE0_API = "https://ce.judge0.com";

const LANGUAGE_IDS = {
  javascript: 63, // Node.js
  python: 71, // Python 3
  java: 62, // Java 17
};

/**
 * @param {string} language
 * @param {string} code
 * @param {string} stdin
 * @returns {Promise<{success:boolean, output?:string, error?:string}>}
 */
export async function executeCode(language, code, stdin = "") {
  try {
    const language_id = LANGUAGE_IDS[language];

    if (!language_id) {
      return {
        success: false,
        error: `Unsupported language: ${language}`,
      };
    }

    const response = await fetch(
      `${JUDGE0_API}/submissions?base64_encoded=false&wait=true`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source_code: code,
          language_id,
          stdin,
        }),
      },
    );

    if (!response.ok) {
      return {
        success: false,
        error: `HTTP Error: ${response.status}`,
      };
    }

    const data = await response.json();

    if (data.compile_output) {
      return {
        success: false,
        error: data.compile_output,
      };
    }

    if (data.stderr) {
      return {
        success: false,
        error: data.stderr,
      };
    }

    if (data.message) {
      return {
        success: false,
        error: data.message,
      };
    }

    return {
      success: true,
      output: data.stdout || "No Output",
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}
