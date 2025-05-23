// utils/isCookieRestricted.ts

export function isCookieRestricted(): boolean {
  try {
    // クッキーを書き込んでテスト
    document.cookie = "cookie_test=1; SameSite=Lax";

    const isSet = document.cookie.includes("cookie_test=1");

    // 後始末（クッキー削除）
    document.cookie = "cookie_test=1; max-age=0";

    // 書き込みが反映されていなければ、制限されている可能性
    return !isSet;
  } catch {
    return true; // 書き込み自体が例外になる場合（制限されている）
  }
}
