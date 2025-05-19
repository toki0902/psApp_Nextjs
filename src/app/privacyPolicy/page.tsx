// app/privacy-policy/page.tsx

const PrivacyPolicy = () => {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 text-gray-800">
      <h1 className="mb-4 text-3xl font-bold">プライバシーポリシー</h1>
      <p className="mb-6">
        <strong>最終更新日：</strong>2025年5月12日
      </p>

      <section className="mb-8">
        <h2 className="mb-2 text-2xl font-semibold">1. 収集する情報</h2>
        <p className="mb-2">
          本サービスでは、以下の情報を取得することがあります：
        </p>
        <ul className="list-inside list-disc space-y-1">
          <li>
            Google または LINE
            によるソーシャルログイン情報（ID・表示名・プロフィール画像）
          </li>
          <li>検索履歴などのサービス利用情報（個人と直接結びつかない形式）</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-2 text-2xl font-semibold">2. 利用目的</h2>
        <ul className="list-inside list-disc space-y-1">
          <li>アカウントの識別と管理</li>
          <li>プロフィール表示</li>
          <li>サービス提供・機能改善</li>
          <li>不正利用防止・セキュリティ対策</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-2 text-2xl font-semibold">3. 第三者提供について</h2>
        <p className="mb-2">
          以下の場合を除き、第三者に個人情報を提供することはありません：
        </p>
        <ul className="list-inside list-disc space-y-1">
          <li>ユーザーの同意がある場合</li>
          <li>法令に基づく場合</li>
          <li>運営に必要な範囲で業務委託する場合</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-2 text-2xl font-semibold">
          4. 外部サービスの利用について
        </h2>
        <p>
          本サービスでは YouTube Data API
          を使用して動画情報を取得しています。ユーザーは
          <a
            href="https://www.youtube.com/t/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            YouTube 利用規約
          </a>{" "}
          および{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Google プライバシーポリシー
          </a>
          に同意したものとみなされます。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-2 text-2xl font-semibold">5. クッキー等の使用</h2>
        <p>
          本サービスでは、ユーザー体験向上のためにクッキーやローカルストレージを利用する場合があります。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-2 text-2xl font-semibold">6. ユーザーの権利</h2>
        <p>
          ユーザーは、自己の個人情報の開示・訂正・削除を求めることができます。ご希望の際は、以下の連絡先までご連絡ください。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-2 text-2xl font-semibold">7. お問い合わせ</h2>
        <p>プライバシーに関するご質問や請求は以下までご連絡ください。</p>
        <p>
          メールアドレス：<strong>toki.zizi.kuro@gmail.com</strong>
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-2 text-2xl font-semibold">8. ポリシーの変更</h2>
        <p>
          本ポリシーは、必要に応じて変更されることがあります。変更の際はアプリまたはウェブサイト上で通知します。
        </p>
      </section>
    </main>
  );
};

export default PrivacyPolicy;
