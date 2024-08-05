export const isPrismaSchema = (schema: string) => {
  const prismaSchemaRegex = /^model\s\w+\s\{[\s\S]+\}$/gm;
  return prismaSchemaRegex.test(schema);
};
