import type { NextConfig } from "next";
import { Header } from "next/dist/lib/load-custom-routes";

const nextConfig: NextConfig = {
  headers: async (): Promise<Header[]> => {
    return [
      {
        source: '/login',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          }
        ]
      }
    ]
  }
};

export default nextConfig;
