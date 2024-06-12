import Link from "next/link";
import styles from "./page.module.css";
import Background from "@/components/ui/Background";
import Button from "@/components/ui/Button";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";

export default function Home() {
  return (
    <main className={styles.main}>
      <Background>
        <section className={styles.home}>
          <h2 className={styles.title}>
            به وقت یک فجان <span className={styles.primary_text}>قهوه</span>
          </h2>
          <h6 className={styles.description}>
            آنلاین سفارش بده، آفلاین حساب کن!
          </h6>

          <div className={styles.container}>
            <Link href={"/random"} className={styles.random_button}>
              <Button type='secondary' rounded='r-3'>
                <GiPerspectiveDiceSixFacesRandom />
                &nbsp; قهوه شانسی
              </Button>
            </Link>
            <Link href={"/menu"} className={styles.munu_button}>
              <Button rounded='r-3'>
                منو کافه&nbsp;
                <FaLongArrowAltLeft className={styles.menu_icon} />
              </Button>
            </Link>
          </div>
        </section>
      </Background>
    </main>
  );
}
