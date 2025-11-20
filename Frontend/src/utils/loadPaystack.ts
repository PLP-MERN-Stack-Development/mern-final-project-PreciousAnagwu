// src/utils/loadPaystack.ts
export const loadPaystack = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (window.PaystackPop) return resolve(); // already loaded

    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.onload = () => resolve();
    script.onerror = () => reject("Failed to load Paystack script");
    document.body.appendChild(script);
  });
};
