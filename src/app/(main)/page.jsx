import { redirect } from "next/navigation";

const redirectId = "01"
export default async function Home() {
  return (
  redirect(`/category/${redirectId}`)
  );
}

