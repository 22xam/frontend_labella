import React from "react";
import { Button } from "../common/Button";

export const SocialButtons = () => {
  const socialLogin = (provider) => {
    console.log(`Login con ${provider}`);
    // Aquí iría la lógica de OAuth
  };

  return (
    <div className="space-y-3">
      <Button
        variant="outline"
        onClick={() => socialLogin("google")}
        className="w-full"
        icon={
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
        }
      >
        Continuar con Google
      </Button>

      <Button
        variant="outline"
        onClick={() => socialLogin("apple")}
        className="w-full"
        icon={
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path
              fill="currentColor"
              d="M17.05 20.28c-.98.95-2.05.88-3.08.38-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.38C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.81 3.57-.76 1.46.07 2.79.61 3.71 1.58-3.44 2.06-2.94 6.66.59 8.12-.7 1.47-1.63 2.92-2.95 3.23zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.38-2.13 4.31-3.74 4.25z"
            />
          </svg>
        }
      >
        Continuar con Apple
      </Button>

      <Button
        variant="outline"
        onClick={() => socialLogin("facebook")}
        className="w-full"
        icon={
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path
              fill="currentColor"
              d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.03 1.79-4.7 4.53-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.89v2.26h3.32l-.53 3.49h-2.79V24C19.62 23.1 24 18.1 24 12.07z"
            />
          </svg>
        }
      >
        Continuar con Facebook
      </Button>
    </div>
  );
};
