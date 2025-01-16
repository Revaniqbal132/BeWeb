/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // Pastikan menggunakan output statis
    images: {
        unoptimized: true, // Menonaktifkan optimisasi gambar
      },
};

export default nextConfig;
