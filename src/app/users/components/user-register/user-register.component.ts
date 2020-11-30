import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { User } from '../../models/user';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss'],
})
export class UserRegisterComponent implements OnInit {
  public form = new FormGroup({});
  public model = new User({});
  public fields: FormlyFieldConfig[] = [
    {
      key: 'username',
      type: 'input',
      templateOptions: {
        type: 'email',
        label: 'Email',
        placeholder: 'Enter email',
        required: true,
      },
    },
    {
      key: 'password',
      type: 'input',
      templateOptions: {
        type: 'password',
        label: 'password',
        placeholder: 'Enter password',
        required: true,
      },
    },
  ];

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  public async registerUser(user: User): Promise<void> {
    console.log('user: ', user);
    let userData = null
    try {
      userData = await this.userService.registerUser(user)
    } catch (error) {
      console.error('error: ', error)
    }
    if(userData?.username) {
      this.model = new User({})
    }
    console.log('userData: ', userData)

  }
}
