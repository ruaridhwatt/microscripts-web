import firebase from "firebase/app";
import App = firebase.app.App;
import FirestoreDataConverter = firebase.firestore.FirestoreDataConverter;

export interface Temperature {
  isValid: boolean;
  temperature: number;
  timestamp: Date;
}

const converter: FirestoreDataConverter<Temperature> = {
  toFirestore(): firebase.firestore.DocumentData {
    throw Error("Not implemented");
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): Temperature {
    const data = snapshot.data(options);
    return {
      isValid: true,
      temperature: data.temperature,
      timestamp: data.timestamp.toDate(),
    };
  },
};

export class TemperatureService {
  private app: firebase.app.App;
  private unsubscribers = [] as Array<() => void>;
  public latest: Temperature;

  constructor(app: App) {
    this.app = app;
    this.latest = {
      isValid: false,
      temperature: 0,
      timestamp: new Date(),
    };
    this.app.auth().onAuthStateChanged((user) => {
      if (user) this.connectToDataSource();
      else this.disconnectFromDataSource();
    });
  }

  private connectToDataSource() {
    const unsub = this.app
      .firestore()
      .collection("TemperatureChangedEvents")
      .orderBy("timestamp", "desc")
      .limit(1)
      .withConverter(converter)
      .onSnapshot((snapshot) => {
        Object.assign(this.latest, snapshot.docs[0].data());
      });
    this.unsubscribers.push(unsub);
  }

  private disconnectFromDataSource() {
    this.unsubscribers.forEach((u) => {
      u();
    });
    this.unsubscribers = [];
    this.latest.isValid = false;
  }
}
