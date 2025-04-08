import Image from "next/image";
import styles from "./page.module.css";
import Header from "@/app/components/header";
import Page from "@/app/blog/page";


export default function Home() {
  return (
    <div className="main-container">
    <Header/>
    <Page/>
<h1>All blogs</h1>
    </div>
  );
}
