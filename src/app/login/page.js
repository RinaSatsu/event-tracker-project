export default function SigninPage() {
  return (
    <div>
      <form class="form">
        <h1 class="title">Register </h1>
        <p class="message">Signup now and get full access to our app.</p>
        <label htmlFor="username">
          <input id="username" required placeholder="" type="text" className="input" />
          <span>Username</span>
        </label>

        <label htmlFor="email">
          <input id="username" required placeholder="" type="email" className="input" />
          <span>Email</span>
        </label>

        <label htmlFor="password">
          <input id="password" required placeholder="" type="password" className="input" />
          <span>Password</span>
        </label>
        <label htmlFor="passwordConf">
          <input id="passwordConf" required placeholder="" type="password" className="input" />
          <span>Confirm password</span>
        </label>
        <button class="submit">Submit</button>
        <p class="signin">Already have an acount ? <a href="#">Signin</a> </p>
      </form>
    </div>
  );
}