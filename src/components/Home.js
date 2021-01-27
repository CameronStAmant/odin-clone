import './Home.css';
import Header from './Header';
import Footer from './Footer';

const Home = () => {
  return (
    <div>
      <Header />
      <div className="home">
        <div className="one">
          <div className="headerText">
            My Career in Web Development Started Here
          </div>
          <div className="text">
            This community will get you from start to finish on buliding
            yourself for a career in web development.
          </div>
          <button className="button">View The Curriculum</button>
        </div>
        <div className="two">
          <div>How it works</div>
          <div>
            This is the website I am glad I found when searching how to become a
            web developer.
          </div>
          <div className="howToLearn">
            <div>
              <div>Image</div>
              <div>Learn</div>
              <div>You will learn everything you need to know here.</div>
            </div>
            <div>
              <div>Image</div>
              <div>Build</div>
              <div>You will build many projects</div>
            </div>
            <div>
              <div>Image</div>
              <div>Connect</div>
              <div>
                There is an entire community waiting for you to join them.
              </div>
            </div>
          </div>
        </div>
        <div className="three">
          <div>Here's what you'll learn</div>
          <div className="languages">
            <div>HTML + CSS</div>
            <div>JAVASCRIPT</div>
            <div>GIT</div>
            <div>DATABASES</div>
            <div>RUBY</div>
            <div>RUBY ON RAILS</div>
            <div>NODEJS</div>
            <div>GETTING HIRED</div>
          </div>
          <button>Get Started</button>
        </div>
        <div className="four">
          <div className="title">Testimonials</div>
          <div className="testimonies">
            <div className="testimony">
              <div className="testimonyImage">Image</div>
              <div className="testimonyInfo">
                <div>Name</div>
                <div>I did this.</div>
              </div>
            </div>
            <div className="testimony">
              <div className="testimonyImage">Image</div>
              <div className="testimonyInfo">
                <div>Name</div>
                <div>Me too.</div>
              </div>
            </div>
            <div className="testimony">
              <div className="testimonyImage">Image</div>
              <div className="testimonyInfo">
                <div>Name</div>
                <div>Me three.</div>
              </div>
            </div>
            <div className="testimony">
              <div className="testimonyImage">Image</div>
              <div className="testimonyInfo">
                <div>Name</div>
                <div>Me four.</div>
              </div>
            </div>
          </div>
          <div className="other">
            <div className="readMore">Read more testimonials</div>
            <div className="startLearning">Start learning for free!</div>
            <button className="signUp">Sign Up</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
