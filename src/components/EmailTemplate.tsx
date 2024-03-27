import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface AirbnbReviewEmailProps {
  authorName: string;
  authorImage: string;
  reviewText: string;
  questionId: string;
}

const AirbnbReviewEmail = ({
  authorName,
  authorImage,
  reviewText,
  questionId,
}: AirbnbReviewEmailProps) => {

  const previewText = `Read ${authorName}'s answer`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>

      <Body style={main}>
        <Container style={container}>
          <Section>
            <Img
              src="https://raw.githubusercontent.com/PiyushGrg/HeapOverflow/main/public/static/logo.png"
              width="125"
              height="140"
              alt="HeapOverflow"
            />
          </Section>
          <Section>
            <Img
              src={authorImage}
              width="96"
              height="96"
              alt={authorName}
              style={userImage}
            />
          </Section>
          <Section style={{ paddingBottom: "20px" }}>
            <Row>
              <Text style={heading}>Here&apos;s what {authorName} answered</Text>
              <Text style={review}>{reviewText}</Text>
              <Text style={paragraph}>
                You can read the full answer by clicking the button below. You can also leave a comment for {authorName} if you&apos;d like.
              </Text>
              <Text style={{ ...paragraph, paddingBottom: "16px" }}>
                Thanks for using HeapOverflow!
              </Text>

              <Button style={button} href={`https://heapoverflow.tech/questions/viewQuestion/${questionId}`}>
                View Answer
              </Button>
            </Row>
          </Section>

          <Hr style={hr} />

          <Section>
            <Row>
              <Text style={footer}>
                This email was sent to you as a registered HeapOverflow user, HeapOverflow Inc.
              </Text>
              <Text style={footer}>
                Logo Credits : <Link style={reportLink} href="https://www.linkedin.com/in/ankit-bhalla-9b6965223/">Ankit Bhalla</Link>
              </Text>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};


export default AirbnbReviewEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "580px",
  maxWidth: "100%",
};

const userImage = {
  margin: "0 auto",
  marginBottom: "16px",
  borderRadius: "50%",
};

const heading = {
  fontSize: "32px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#484848",
};

const paragraph = {
  fontSize: "18px",
  lineHeight: "1.4",
  color: "#484848",
};

const review = {
  ...paragraph,
  padding: "24px",
  backgroundColor: "#f2f3f3",
  borderRadius: "4px",
};

const button = {
  backgroundColor: "#FEA500",
  borderRadius: "3px",
  color: "#5D127C",
  fontSize: "18px",
  paddingTop: "19px",
  paddingBottom: "19px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
};

const link = {
  ...paragraph,
  color: "#5D127C",
  display: "block",
};

const reportLink = {
  fontSize: "14px",
  color: "#9ca299",
  textDecoration: "underline",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#9ca299",
  fontSize: "14px",
  marginBottom: "10px",
};

