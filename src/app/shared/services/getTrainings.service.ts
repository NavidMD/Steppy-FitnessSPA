import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CompletedTrainingInfo, NewTrainingInfo, TrainingInfo } from '../types';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import firebase from 'firebase/compat/app';
import { UserAdditionalInfo } from '../../authentication/user.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class GetTrainingsService {
  constructor(
    private database: AngularFirestore,
    private firebaseAuth: AngularFireAuth
  ) {}

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

  // Completed Trainings

  getCompletedTrainingsDb(userId: string): Observable<object[]> {
    return this.database
      .collection<UserAdditionalInfo>('Users')
      .doc(userId)
      .valueChanges()
      .pipe(map((userDoc) => userDoc?.completedTrainings ?? []));
  }

  addToCompletedTrainingsDb(exercise: CompletedTrainingInfo) {
    this.firebaseAuth.currentUser.then((user) => {
      if (user) {
        const userDocRef = this.database.collection('Users').doc(user.uid);
        userDocRef
          .update({
            completedTrainings:
              firebase.firestore.FieldValue.arrayUnion(exercise),
          })
          .then(() => console.log('new exercise finished'))
          .catch((err) => console.error(err));
      }
    });
  }

  deleteCompletedTraining(trainingId: number) {
    this.firebaseAuth.currentUser.then((user) => {
      if (user) {
        const userDocRef = this.database.collection('Users').doc(user.uid);
        userDocRef.get().subscribe((doc) => {
          const data: any = doc.data();
          const updatedTrainings = data.completedTrainings.filter(
            (t: any) => t.id !== trainingId
          );
          userDocRef
            .update({ completedTrainings: updatedTrainings })
            .then(() => console.log('Completed Training removed by id'))
            .catch((err) => console.error(err));
        });
      }
    });
  }

  // New Trainings

  getNewTrainingsDb(userId: string): Observable<object[]> {
    return this.database
      .collection<UserAdditionalInfo>('Users')
      .doc(userId)
      .valueChanges()
      .pipe(map((userDoc) => userDoc?.newTrainings ?? []));
  }

  addToNewTrainingsDb(exercise: NewTrainingInfo, userId: string) {
    this.database
      .collection('Users')
      .doc(userId)
      .update({
        newTrainings: firebase.firestore.FieldValue.arrayUnion(exercise),
      });
  }

  deleteNewTraining(trainingId: number) {
    this.firebaseAuth.currentUser.then((user) => {
      if (user) {
        const userDocRef = this.database.collection('Users').doc(user.uid);
        userDocRef.get().subscribe((doc) => {
          const data: any = doc.data();
          const updatedTrainings = data.newTrainings.filter(
            (t: any) => t.id !== trainingId
          );
          userDocRef
            .update({ newTrainings: updatedTrainings })
            .then(() => console.log('Training removed by id'))
            .catch((err) => console.error(err));
        });
      }
    });
  }

  deleteAllNewTrainings() {
    this.firebaseAuth.currentUser.then((user) => {
      if (user) {
        const userDocRef = this.database.collection('Users').doc(user.uid);
        userDocRef
          .update({ newTrainings: [] })
          .then(() => console.log('Training removed by id'))
          .catch((err) => console.error(err));
      }
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
