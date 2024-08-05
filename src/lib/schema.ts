export const schema = `model Tag {
  id        String   @id @default(cuid())
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  food      Food[]   @relation("Food_Tags")
}`;
