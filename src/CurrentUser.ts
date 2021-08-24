import firebase from "firebase/app";
import App = firebase.app.App;

export class CurrentUser {
  private app: firebase.app.App;
  public isSignedIn: boolean;
  public displayName: string;
  public email: string;

  constructor(app: App) {
    this.app = app;
    this.isSignedIn = false;
    this.displayName = "";
    this.email = "";
    app
      .auth()
      .onAuthStateChanged((currentUser) => this.updateState(currentUser));
  }

  private updateState(currentUser: firebase.User | null) {
    this.isSignedIn = !!currentUser;
    this.displayName = currentUser?.displayName || "";
    this.email = currentUser?.email || "";
  }

  signIn(): void {
    this.app
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((userCredential) => {
        console.log(`${userCredential.user?.displayName} signed in`);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  signOut(): void {
    this.app
      .auth()
      .signOut()
      .then(() => {
        console.log("User signed out");
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
