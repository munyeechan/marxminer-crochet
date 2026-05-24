import { Resend }
from "resend";

const resend =
  new Resend(

    process.env.RESEND_API_KEY

  );

export async function POST(
  request: Request
) {

  const body =
    await request.json();

  const {

    email,
    total,

  } = body;

  try {

    await resend.emails.send({

      from:
        "Marxminer <onboarding@resend.dev>",

      to: email,

      subject:
        "订单确认 ✨",

      html: `

        <h1>
          感谢您的订单 ✨
        </h1>

        <p>
          您的订单已收到。
        </p>

        <p>
          总金额：
          S$${total}
        </p>

      `,

    });

    return Response.json({

      success: true,

    });

  } catch (error) {

    return Response.json({

      error,

    });

  }

}