import Link from "next/link";
export default function Header() {
  return (
    <header className="w-full p-4 rounded-full bg-primary">
      <nav className="w-full flexBetween">
        <Link href={`/`} className="text-4xl font-bold btn btn-ghost">
          Topic
        </Link>
        <Link href={`/addTopic`} className="btn">
          Add Topic
        </Link>
      </nav>
    </header>
  );
}
