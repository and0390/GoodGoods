import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "react-email";

interface ResetPasswordEmailProps {
  name?: string;
  resetUrl: string;
}

export default function ResetPasswordEmail({
  name = "there",
  resetUrl,
}: ResetPasswordEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>Reset your GoodGoods password</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              fontFamily: {
                sans: ['"Open Sans"', "sans-serif"],
              },
              colors: {
                background: "#fcfcfc", // oklch(0.9911 0 0)
                foreground: "#27272a", // oklch(0.1994 0.047 270.6494)
                primary: {
                  DEFAULT: "#5c5cfc", // oklch(0.5729 0.2337 264.3664) - Your Purple
                  foreground: "#ffffff",
                },
                secondary: {
                  DEFAULT: "#27272a",
                  foreground: "#ffffff",
                },
                muted: {
                  DEFAULT: "#ffffff",
                  foreground: "#27272a",
                },
                card: {
                  DEFAULT: "#fafafa",
                  foreground: "#27272a",
                },
                border: "#e4e4e7", // oklch(0.9212 0.0033 17.217)
              },
              borderRadius: {
                sm: "0.78rem", // calc(1.3rem * 0.6)
                md: "1.04rem", // calc(1.3rem * 0.8)
                lg: "1.3rem", // var(--radius)
                xl: "1.82rem", // calc(1.3rem * 1.4)
                "2xl": "2.34rem",
              },
            },
          },
        }}
      >
        <Body className="m-0 bg-background font-sans text-foreground">
          <Container className="mx-auto my-10 w-full max-w-[480px] px-4">
            {/* Branding */}
            <Section className="mb-4">
              <Text className="text-xl font-bold tracking-tighter text-foreground">
                GoodGoods
              </Text>
            </Section>

            {/* Main Content Card */}
            <Section className="mx-auto rounded-lg border border-solid border-border bg-card p-8">
              <Heading className="m-0 mx-auto text-2xl font-semibold tracking-tight text-foreground">
                Reset your password
              </Heading>

              <Text className="mt-4 text-sm leading-6 text-muted-foreground">
                Hi {name},
              </Text>

              <Text className="mt-2 text-sm leading-6 text-muted-foreground">
                We received a request to reset the password for your account. If
                you didn&apos;t make this request, you can safely ignore this
                email.
              </Text>

              {/* Action Button */}
              <Section className="my-8 text-center">
                <Button
                  href={resetUrl}
                  className="inline-flex items-center justify-center rounded-full bg-[#5c5cfc] px-6 py-3 text-sm font-medium text-primary-foreground no-underline shadow-sm"
                >
                  Reset Password
                </Button>
              </Section>

              {/* Security Box */}
              <Section className="rounded-md bg-muted px-4 py-3">
                <Text className="m-0 text-xs leading-5 text-muted-foreground">
                  <span className="font-semibold text-foreground">Note:</span>{" "}
                  This link will expire in{" "}
                  <span className="font-medium text-foreground">
                    15 minutes
                  </span>
                  . For your security, please do not share this link with
                  anyone.
                </Text>
              </Section>

              <Hr className="my-8 border-border" />

              <Text className="m-0 text-xs leading-5 text-muted-foreground">
                If you&apos;re having trouble clicking the password reset
                button, copy and paste the URL below into your web browser:
              </Text>
              <Text className="mt-2 text-xs break-all text-primary underline">
                {resetUrl}
              </Text>
            </Section>

            {/* Footer */}
            <Section className="mt-8 text-center text-muted-foreground">
              <Text className="m-0 text-[11px] font-medium">
                GoodGoods Indonesia
              </Text>
              <Text className="mt-1 text-[11px]">
                © {new Date().getFullYear()} GoodGoods Inc. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
