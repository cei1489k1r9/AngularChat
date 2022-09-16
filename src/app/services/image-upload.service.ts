import { Injectable } from '@angular/core';
import { from, Observable, switchMap } from 'rxjs';
import { getDownloadURL, ref, Storage} from '@angular/fire/storage';
import { uploadBytes } from '@firebase/storage';


@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(private storage: Storage) { }

  uploadImage(image: File, path: string): Observable<string> {
    const storageRef = ref(this.storage, path);
    const uploadTask = from(uploadBytes(storageRef, image));
    return uploadTask.pipe(
      switchMap((result) => getDownloadURL(result.ref))
    );
  }
}
