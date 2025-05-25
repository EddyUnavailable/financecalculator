import Image from "next/image";
import styles from "@/styles/layout.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <p>Hi, I am Eddy.</p>

      <p>
        I recently completed a 3-month course with Tech Educators.  
        I didn’t really absorb much JavaScript while there. Although it is not really their fault,  
        as I prefer CSS and tended to get very distracted. Plus, React hates me.  
        So I plan to ignore React and the nasty things it says,  
        and instead improve my skills in CSS.
      </p>

      <p>
        I used an AI to create all the JavaScript code for this app.  
        I only did the CSS, added a console.log here and there, and did some yelling at the AI.
      </p>

      <p>
        The app should work, but its main function was so I could practice CSS  
        and show what level I am at right now, and hopefully look back and see big improvements.
      </p>

      <p>
        I have ignored media queries and anything that benefits others.  
        It is designed for my phone and my things.
      </p>

      <p>
        The reason it is functional is that during the course I took,  
        I had terrible problems building CSS around various JavaScript code.  
        I feel I have vastly improved there now and a lot more confident doing so.
      </p>

      <p>
        While building, I was planning to make this a fully working app,   
        but then the AI told me Android Studio existed,  
        so if I ever finish this, it will be with that.
      </p>
    </div>
  );
}
