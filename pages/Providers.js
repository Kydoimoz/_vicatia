"use client";
import { SessionProvider } from "next-auth/react";
import React from 'react';

const AuthProviders = ({ children }) => {
  // Ihre Komponentenlogik hier
  return (
    <SessionProvider>{children}</SessionProvider>
  );
};

export default AuthProviders;