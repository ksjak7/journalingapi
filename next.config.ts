import type { NextConfig } from "next";
import { Header } from "next/dist/lib/load-custom-routes";

const nextConfig: NextConfig = {
  headers: async (): Promise<Header[]> => {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'POST',
          }
        ]
      }
    ]
  }
};

export default nextConfig;
