import Link from "next/link";
import styles from "./page.module.css";
import Background from "@/components/ui/Background";
import Button from "@/components/ui/Button";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.bg_container} id='home'>
        <Background>
          <section className={styles.home}>
            <h2 className={styles.title}>
              به وقت یک فجان <span className={styles.primary_text}>قهوه</span>
            </h2>
            <h6 className={styles.description}>
              آنلاین سفارش بده، آفلاین حساب کن!
            </h6>

            <div className={styles.container}>
              <Link href='/random' className={styles.random_button}>
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
      </div>

      <div className={styles.bg_container} id='yard'>
        <Background imageSrc={`/images/yard.jpg`}>
          <section className={styles.yard_content}>
            <h2 className={styles.title} style={{ textAlign: "center" }}>
              فضای گرم دوستانه
            </h2>
          </section>
        </Background>
      </div>

      <div className={styles.bg_container} id='planning'>
        <Background imageSrc={`/images/planning.jpg`}>
          <section className={styles.planning_content}>
            <h2 className={styles.title} style={{ textAlign: "center" }}>
              محیطی آرام و دلنشین
            </h2>
          </section>
        </Background>
      </div>

      <div className={styles.bg_container} id='latte'>
        <Background imageSrc={`/images/latte.jpg`}>
          <section className={styles.latte_content}>
            <h2 className={styles.title} style={{ textAlign: "center" }}>
              روز خود را با طعمی دلنشین آغاز کنید!
            </h2>
          </section>
        </Background>
      </div>
    </main>
  );
}
