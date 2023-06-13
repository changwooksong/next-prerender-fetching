import Link from "next/link";
import path from "path";
import fs from "fs/promises";

function HomePage(props) {
    const { projects } = props;

    return (
        <ul>
            {projects.map((project) => (
                <li key={project.id}>
                    <Link href={`/${project.id}`}>{project.title}</Link>
                </li>
            ))}
        </ul>
    );
}

export async function getStaticProps(context) {
    console.log("(Re) Henetaeasd");
    const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);

    // ex) DB에 액세스할 수 없을떄(데이터 자체가 없을때)
    if (!data) {
        return {
            redirect: {
                destination: "/no-data",
            },
        };
    }

    // 상품이 없을때
    if (data.products.length === 0) {
        return { notFound: true };
    }

    return {
        props: {
            projects: data.products,
        },
        revalidate: 10,
    };
}

export default HomePage;
