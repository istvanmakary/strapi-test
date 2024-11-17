import Image from "next/image";
import styles from "../page.module.css";
import { fetchTender } from "@/api/tender";
import { BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer";

export const dynamic = 'force-dynamic';

export default async function Tender() {
  const { data } = await fetchTender();
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>{data.Title}</h1>
        <div>
          {(data.tenders as { AuthorBirthData: string; AuthorName: string; Content: BlocksContent; id: string }[]).map(({ id, AuthorName, AuthorBirthData, Content }) => (
            <div key={id}>
              <p>Name: {AuthorName}</p>
              <p>BirthDate: {AuthorBirthData}</p>
              <p>Content:</p>
              {Content && <BlocksRenderer content={Content} />}
            </div>
          ))}
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
