import { getJWTToken } from "@coze/api"
import fs from 'fs'
import path from 'path'

const configPath = path.join(process.cwd(), 'conf', 'coze_oauth_config.json');

// Load configuration file
function loadConfig() {
  // Check if configuration file exists
  if (!fs.existsSync(configPath)) {
    throw new Error(
      "Configuration file coze_oauth_config.json does not exist!"
    );
  }

  // Read configuration file
  const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

  // Validate required fields
  const requiredFields = [
    "client_type",
    "client_id",
    "public_key_id",
    "private_key",
    "coze_www_base",
    "coze_api_base",
  ];

  for (const field of requiredFields) {
    if (!config[field]) {
      throw new Error(`Configuration file missing required field: ${field}`);
    }
    if (typeof config[field] === "string" && !config[field].trim()) {
      throw new Error(`Configuration field ${field} cannot be an empty string`);
    }
  }

  return config;
}

// Load configuration
const config = loadConfig();

// 将自定义 Hook 改为普通异步函数
const getJWTTokenAsync = async() => {
    const oauthToken = await getJWTToken({
        baseURL: config.coze_api_base,
        appId: config.client_id,
        aud: new URL(config.coze_api_base).host,
        keyid: config.public_key_id,
        privateKey: config.private_key,
    });
    const access_token = oauthToken.access_token;
    return access_token
}

export default async function handler(req, res) {
    try {
        const token = await getJWTTokenAsync();
        res.status(200).json({ token: token });
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate JWT token' });
    }
}