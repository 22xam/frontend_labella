import React from "react";
import { Button } from "../common/Button";

export const PasskeyButton = () => {
  const handlePasskeyLogin = async () => {
    if (!window.PublicKeyCredential) {
      alert("Tu dispositivo no soporta passkeys");
      return;
    }

    alert("Autenticación con passkey (simulada)");
  };

  return (
    <Button variant="outline" onClick={handlePasskeyLogin} className="w-full mt-3">
      Usar passkey o huella digital
    </Button>
  );
};
