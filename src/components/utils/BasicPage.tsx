import Container from "./Container";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { ReactNode } from "react";
import { Title } from "./Title";

interface PageProps {
  title?: string;
  children?: ReactNode;
}

export default function BasicPage({ title, children }: PageProps) {
  return (
    <main className="flex flex-col justify-between  min-h-screen">
      <Header />
      <Container>
        {title && <Title>{title}</Title>}
        {children}
      </Container>
      <Footer />
    </main>
  );
}
