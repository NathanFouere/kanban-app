import type { CardDto } from '@/dto/card-dto.ts';

export interface CardContainerDto {
  id: number;
  title: string;
  cards: CardDto[];
}
