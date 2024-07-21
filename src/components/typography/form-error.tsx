export default function FormError({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <p className="text-sm font-medium text-destructive">{children}</p>;
}
