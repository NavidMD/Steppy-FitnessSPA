import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CompletedTrainingInfo, NewTrainingInfo, TrainingInfo } from '../types';
import { map, Observable, Subject } from 'rxjs';
import firebase from 'firebase/compat/app';

@Injectable()
export class GetTrainingsService {
  constructor(private database: AngularFirestore) {}

  completedTrainingsFromDb = new Subject<CompletedTrainingInfo[]>();

  getExerciseModels(): Observable<TrainingInfo[]> {
    return this.database
      .collection<TrainingInfo>('ExerciseModels')
      .valueChanges();
  }

  getExerciseByName(name: string) {
    return this.database
      .collection<TrainingInfo>('ExerciseModels', (ref) =>
        ref.where('exerciseName', '==', name)
      )
      .valueChanges()
      .pipe(map((data) => data[0]));
  }

  addToCompletedTrainingsDb(exercise: CompletedTrainingInfo) {
    this.database.collection('CompletedTrainings').add(exercise);
  }

  addToNewTrainingsDb(exercise: NewTrainingInfo, userId: string) {
    console.log(userId);
    this.database
      .collection('Users')
      .doc(userId)
      .update({
        newTrainings: firebase.firestore.FieldValue.arrayUnion(exercise),
      });
  }

  getCompletedTrainingsDb() {
    this.database
      .collection<CompletedTrainingInfo>('CompletedTrainings')
      .snapshotChanges()
      .subscribe((actions) => {
        const trainings = actions.map((a) => {
          const docData = a.payload.doc.data() as CompletedTrainingInfo;
          const id = a.payload.doc.id;
          return { ...docData, id };
        });
        this.completedTrainingsFromDb.next(trainings);
      });
  }

  deleteItemFromDb(collectionName: string, id: string) {
    this.database
      .collection(collectionName)
      .doc(id)
      .delete()
      .then(() => console.log(`item ${id} deleted`))
      .catch((err) => console.error('Error deleting: ', err));
  }
}
