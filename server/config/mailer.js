import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.APP_PASSWORD,
    },
});

// Письмо после подписки
export const sendSubscriptionEmail = async (clientEmail) => {
    await transporter.sendMail({
        from: `"NEWS ANALITYNCS" <${process.env.ADMIN_EMAIL}>`,
        to: clientEmail,
        subject: "Вы подписались на NEWS ANALITYNCS",
        html: `
            <div style="
                font-family: Arial, sans-serif;
                max-width: 600px;
                margin: 0 auto;
                padding: 30px;
                color: #111;
            ">
                <div style="
                    background: #111;
                    color: white;
                    padding: 25px;
                    border-left: 5px solid #b81d24;
                ">
                    <h1 style="margin: 0;">
                        NEWS ANALITYNCS
                    </h1>
                </div>

                <div style="padding: 30px 0;">
                    <h2>
                        Спасибо за подписку!
                    </h2>

                    <p style="line-height: 1.6;">
                        Вы успешно подписались на нашу рассылку.
                    </p>

                    <p style="line-height: 1.6;">
                        Мы будем отправлять вам важные новости,
                        аналитические материалы и специальные
                        публикации редакции.
                    </p>

                    <p style="
                        margin-top: 30px;
                        color: #777;
                    ">
                        NEWS ANALITYNCS
                    </p>
                </div>
            </div>
        `,
    });
};

// Рассылка новости подписчикам
export const sendNewsletterEmail = async ({
    to,
    subject,
    title,
    content,
}) => {
    await transporter.sendMail({
        from: `"NEWS ANALITYNCS" <${process.env.ADMIN_EMAIL}>`,
        to,
        subject,
        html: `
            <div style="
                font-family: Arial, sans-serif;
                max-width: 700px;
                margin: 0 auto;
                color: #111;
                background: #ffffff;
            ">
                <div style="
                    background: #111;
                    color: #fff;
                    padding: 30px;
                    border-top: 5px solid #b81d24;
                ">
                    <div style="
                        font-size: 12px;
                        letter-spacing: 2px;
                        color: #aaa;
                        margin-bottom: 10px;
                    ">
                        NEWSLETTER
                    </div>

                    <h1 style="
                        margin: 0;
                        font-size: 28px;
                    ">
                        NEWS ANALITYNCS
                    </h1>
                </div>

                <div style="
                    padding: 35px 30px;
                ">
                    <h2 style="
                        margin: 0 0 20px;
                        font-size: 25px;
                    ">
                        ${title}
                    </h2>

                    <div style="
                        font-size: 16px;
                        line-height: 1.7;
                        color: #333;
                    ">
                        ${content
                            .split("\n")
                            .filter(Boolean)
                            .map(
                                (paragraph) =>
                                    `<p>${paragraph}</p>`
                            )
                            .join("")}
                    </div>

                    <div style="
                        margin-top: 35px;
                        padding-top: 20px;
                        border-top: 1px solid #ddd;
                        color: #888;
                        font-size: 12px;
                    ">
                        NEWS ANALITYNCS<br>
                        Вы получили это письмо, потому что подписались
                        на нашу рассылку.
                    </div>
                </div>
            </div>
        `,
    });
};

export const sendNewArticleEmail = async ({
    to,
    title,
    content,
    articleId,
}) => {
    const articleUrl = `http://localhost:5173/article/${articleId}`;

    await transporter.sendMail({
        from: `"NEWS ANALITYNCS" <${process.env.ADMIN_EMAIL}>`,
        to,
        subject: `Новая публикация — ${title}`,
        html: `
            <div style="
                font-family: Arial, sans-serif;
                max-width: 700px;
                margin: 0 auto;
                color: #111;
                background: #ffffff;
            ">

                <div style="
                    background: #111;
                    color: #fff;
                    padding: 30px;
                    border-top: 5px solid #b81d24;
                ">
                    <div style="
                        font-size: 12px;
                        letter-spacing: 2px;
                        color: #aaa;
                        margin-bottom: 10px;
                    ">
                        НОВАЯ ПУБЛИКАЦИЯ
                    </div>

                    <h1 style="
                        margin: 0;
                        font-size: 28px;
                    ">
                        NEWS ANALITYNCS
                    </h1>
                </div>

                <div style="
                    padding: 35px 30px;
                ">

                    <h2 style="
                        margin: 0 0 20px;
                        font-size: 25px;
                    ">
                        ${title}
                    </h2>

                    <div style="
                        font-size: 16px;
                        line-height: 1.7;
                        color: #333;
                    ">
                        ${content
                            .split("\n")
                            .filter(Boolean)
                            .map(
                                (paragraph) =>
                                    `<p>${paragraph}</p>`
                            )
                            .join("")}
                    </div>

                    <div style="
                        margin-top: 30px;
                    ">
                        <a
                            href="${articleUrl}"
                            style="
                                display: inline-block;
                                padding: 14px 24px;
                                background: #b81d24;
                                color: #ffffff;
                                text-decoration: none;
                                font-weight: bold;
                            "
                        >
                            Читать полностью
                        </a>
                    </div>

                    <div style="
                        margin-top: 35px;
                        padding-top: 20px;
                        border-top: 1px solid #ddd;
                        color: #888;
                        font-size: 12px;
                    ">
                        NEWS ANALITYNCS<br><br>

                        Вы получили это письмо, потому что
                        подписались на нашу рассылку.
                    </div>

                </div>
            </div>
        `,
    });
};