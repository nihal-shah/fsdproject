import Blog from "./Blog.js"
import Time from "./time.jpg"
import Fruit from "./fruits.jpg"
import Holiday from "./holiday.jpg"
import Decoration from "./decoration.jpg"
import AI from "./image.jpg"
import "./body.css"
import {Link} from "react-router-dom"

function Body(){
    return(
        <div className="BodyDiv">
            <Link className="linkreact" to="/FullBlog"><Blog title="How to invest time?" imageUrl={Time} content="Investing time is a valuable and impactful practice that can lead to personal growth, skill development, and a more fulfilling life.
                                                                                     Just like financial investments, where the goal is to accumulate wealth over time, investing time involves deliberate and purposeful actions aimed at yielding positive returns." /></Link>
            <Link className="linkreact" to="/FullBlog"><Blog title="Healty food Benifits?" imageUrl={Fruit} content="Embracing a diet rich in health foods is a transformative choice that not only nurtures the body but also fosters mental well-being.
                                                                                                 Consuming nutrient-dense foods is akin to providing our bodies with the best fuel, allowing them to function optimally. Fresh fruits and vegetables, whole grains, lean proteins, and healthy fats are not merely ingredients; they are a prescription for vitality and longevity." /></Link>
            <Link className="linkreact" to="/FullBlog"><Blog title="Best place for travel?" imageUrl={Holiday} content="Embarking on a journey to discover the best travel destination is an exhilarating quest, filled with endless possibilities. One destination that consistently captivates the hearts of adventurers
                                                                                         is the magical city of Kyoto, Japan. Nestled amidst serene bamboo groves and adorned with historic temples, Kyoto is a seamless blend of ancient tradition and modern innovation. "/></Link>
            <Link className="linkreact" to="/FullBlog"><Blog title="How to decorate home on festivals?" imageUrl={Decoration} content="The arrival of festivals brings with it an opportunity to infuse your home with warmth, joy, and a touch of magic. Decorating your space during festive seasons transforms your surroundings,
                                                                                                        creating a celebratory atmosphere that resonates with the spirit of the occasion. In this blog post, we'll explore creative and thoughtful ways to adorn your home, making it a welcoming haven for family and friends during festivals."/></Link>
            <Link className="linkreact" to="/FullBlog"><Blog title="How to learn AI?" imageUrl={AI} content="In a world driven by technological advancements, delving into the realm of Artificial Intelligence (AI) opens up a universe of possibilities. Whether you're a tech enthusiast
                                                                                , a student, or a professional seeking to enhance your skills, learning AI can be an exciting and rewarding journey. "/></Link>
        </div>
    )
}
export default Body;