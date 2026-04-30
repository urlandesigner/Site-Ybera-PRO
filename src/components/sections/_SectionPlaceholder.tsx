import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";

type SectionPlaceholderProps = {
  id: string;
  title: string;
};

export function SectionPlaceholder({ id, title }: SectionPlaceholderProps) {
  return (
    <Section id={id}>
      <Container>
        <Card>
          <p className="font-display text-2xl font-bold text-ink-strong">{title}</p>
        </Card>
      </Container>
    </Section>
  );
}
