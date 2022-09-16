import { Component, OnInit } from '@angular/core';
import { user, User } from '@angular/fire/auth';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ImageUploadService } from 'src/app/services/image-upload.service';
import { HotToastService } from '@ngneat/hot-toast';
import { concatMap } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user$ = this.authService.currentUser$;

  profileForm = new FormGroup({
  uid: new FormControl(''),
  displayName: new FormControl(''),
  firstName: new FormControl(''),
  lastName: new FormControl(''),
  phone: new FormControl(''),
  address: new FormControl(''),
  });

  constructor(private authService: AuthenticationService,
    private imageUploadService: ImageUploadService,
    private toast: HotToastService,
    private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.currentUserProfile$.pipe(
      untilDestroyed(this)
    ).subscribe((user)=> {
      this.profileForm.patchValue({...user });
    })
  }

  uploadImage(event: any, user: User){
    this.imageUploadService.uploadImage(event.target.files[0], `images/profile/${user.uid}`).pipe(
      this.toast.observe(
        {
          loading: 'Image is being uploaded...',
          success: 'Image uploaded successfully',
          error: 'Error Uploading File!'
        }
      ),
        concatMap((photoURL) => this.authService.updateProfileData({photoURL}))
        )
        .subscribe();

    }

    saveProfile(){
    }







  }


