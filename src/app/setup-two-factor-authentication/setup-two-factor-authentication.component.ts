import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { SystemService } from '../services/system.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ApisService } from '../services/apis.service';

@Component({
  selector: 'app-setup-two-factor-authentication',
  imports:[CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './setup-two-factor-authentication.component.html',
  styleUrl: './setup-two-factor-authentication.component.css'
})
export class SetupTwoFactorAuthenticationComponent implements OnInit{

  twoFactorForm: FormGroup;
  verifyForm: FormGroup;
  isSubmitting = false;
  phoneNumber!:string;

  page:string = 'form';

  @ViewChildren('digitInput') digitInputs!: QueryList<ElementRef<HTMLInputElement>>;

  // Common country codes
  countryCodes = [
  { code: '+1', country: 'USA / Canada' },
  { code: '+7', country: 'Russia' },
  { code: '+20', country: 'Egypt' },
  { code: '+27', country: 'South Africa' },
  { code: '+30', country: 'Greece' },
  { code: '+31', country: 'Netherlands' },
  { code: '+32', country: 'Belgium' },
  { code: '+33', country: 'France' },
  { code: '+34', country: 'Spain' },
  { code: '+36', country: 'Hungary' },
  { code: '+39', country: 'Italy' },
  { code: '+40', country: 'Romania' },
  { code: '+41', country: 'Switzerland' },
  { code: '+43', country: 'Austria' },
  { code: '+44', country: 'United Kingdom' },
  { code: '+45', country: 'Denmark' },
  { code: '+46', country: 'Sweden' },
  { code: '+47', country: 'Norway' },
  { code: '+48', country: 'Poland' },
  { code: '+49', country: 'Germany' },
  { code: '+51', country: 'Peru' },
  { code: '+52', country: 'Mexico' },
  { code: '+53', country: 'Cuba' },
  { code: '+54', country: 'Argentina' },
  { code: '+55', country: 'Brazil' },
  { code: '+56', country: 'Chile' },
  { code: '+57', country: 'Colombia' },
  { code: '+58', country: 'Venezuela' },
  { code: '+60', country: 'Malaysia' },
  { code: '+61', country: 'Australia' },
  { code: '+62', country: 'Indonesia' },
  { code: '+63', country: 'Philippines' },
  { code: '+64', country: 'New Zealand' },
  { code: '+65', country: 'Singapore' },
  { code: '+66', country: 'Thailand' },
  { code: '+81', country: 'Japan' },
  { code: '+82', country: 'South Korea' },
  { code: '+84', country: 'Vietnam' },
  { code: '+86', country: 'China' },
  { code: '+90', country: 'Turkey' },
  { code: '+91', country: 'India' },
  { code: '+92', country: 'Pakistan' },
  { code: '+93', country: 'Afghanistan' },
  { code: '+94', country: 'Sri Lanka' },
  { code: '+95', country: 'Myanmar' },
  { code: '+98', country: 'Iran' },
  { code: '+212', country: 'Morocco' },
  { code: '+213', country: 'Algeria' },
  { code: '+216', country: 'Tunisia' },
  { code: '+234', country: 'Nigeria' },
  { code: '+254', country: 'Kenya' },
  { code: '+351', country: 'Portugal' },
  { code: '+353', country: 'Ireland' },
  { code: '+354', country: 'Iceland' },
  { code: '+358', country: 'Finland' },
  { code: '+380', country: 'Ukraine' },
  { code: '+502', country: 'Guatemala' },
  { code: '+503', country: 'El Salvador' },
  { code: '+504', country: 'Honduras' },
  { code: '+505', country: 'Nicaragua' },
  { code: '+506', country: 'Costa Rica' },
  { code: '+507', country: 'Panama' },
  { code: '+593', country: 'Ecuador' },
  { code: '+852', country: 'Hong Kong' },
  { code: '+853', country: 'Macau' },
  { code: '+886', country: 'Taiwan' },
  { code: '+966', country: 'Saudi Arabia' },
  { code: '+971', country: 'UAE' },
  { code: '+972', country: 'Israel' },
  { code: '+974', country: 'Qatar' }
];

  get_user_subscription!:Subscription;
  user:any;

  verifyDebouncerTimeout:any;

  constructor(
    private fb: FormBuilder,
    public systemService: SystemService,
    public authService: AuthService,
    public apisService: ApisService,
    public router: Router
  ) {
    this.twoFactorForm = this.fb.group({
      countryCode: ['+1', [Validators.required]],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]{10,14}$') // Validates 10-14 digit phone numbers
        ]
      ]
    });

    this.verifyForm = this.fb.group({
      digits: this.fb.array(
        Array(6)
          .fill('')
          .map(() => this.fb.control('', [Validators.required, Validators.pattern('^[0-9]$')]))
      )
    });
  }

  ngOnInit(): void {

    this.get_user_subscription = this.authService.currentUserSubject.subscribe((currentUser) => {
      if (currentUser) {
          this.user = currentUser;
        if (this.user.phone_has_been_verified) {
          this.page = 'verify';
          this.systemService.SendCode2FA({
            phone_number: this.user.phone.trim()
          }).subscribe();
        }
          //this.loadGroups();
          console.log('@2FA login: this.user', this.user);
        }
        //this.loadHours();
      else this.router.navigate(['/login']);
    });

  }

  onSubmit(): void {
    if (this.twoFactorForm.invalid) {
      this.twoFactorForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const fullPhoneNumber = `${this.twoFactorForm.value.countryCode}${this.twoFactorForm.value.phoneNumber}`;

    // Simulate API call to send verification code via Twilio/Backend
    //setTimeout(() => {
      this.isSubmitting = false;
      // Navigate or transition to OTP verification step
      this.systemService.SendCode2FA({
        phone_number: fullPhoneNumber
      }).subscribe(() => {
        this.page = 'verify';
      });
      
    //}, 1500);
  }

  onSkip(): void {
    console.log('User skipped 2FA setup');
    // Handle skip logic (e.g., navigate to dashboard)
    //console.log('response', response);
    if (this.user.role == 'admin') this.router.navigate(['u/dashboard']);
    else if (this.user.role == 'production-admin') this.router.navigate(['p/production-details']);
    else if (this.user.role == 'executive-admin') this.router.navigate(['e/productions']);

  }

   get digitsControls(): FormArray {
    return this.verifyForm.get('digits') as FormArray;
  }

  // Auto-advance focus to the next input box when typing
  onInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (value && index < 5) {
      const inputsArray = this.digitInputs.toArray();
      inputsArray[index + 1].nativeElement.focus();
    }

    // Auto-submit if all 6 digits are filled
    if (this.verifyForm.valid) {
      //this.onSubmitVerification();
    }
  }

  // Handle backspace to shift focus backwards
  onKeyDown(event: KeyboardEvent, index: number): void {
    if (event.key === 'Backspace' && !this.digitsControls.at(index).value && index > 0) {
      const inputsArray = this.digitInputs.toArray();
      inputsArray[index - 1].nativeElement.focus();
    }
  }

  // Handle pasting a 6-digit code into any input
  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pastedData = event.clipboardData?.getData('text')?.trim();

    if (pastedData && /^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split('');
      digits.forEach((digit, i) => {
        this.digitsControls.at(i).setValue(digit);
      });
      
      // Focus last input
      const inputsArray = this.digitInputs.toArray();
      inputsArray[5].nativeElement.focus();

      //this.onSubmitVerification();
    }
  }

  onSubmitVerification(): void {

    if (this.verifyDebouncerTimeout) clearTimeout(this.verifyDebouncerTimeout); 
    this.verifyDebouncerTimeout = setTimeout(() => {

    if (this.verifyForm.invalid) {
      this.verifyForm.markAllAsTouched();
      return;
    }

    
    this.isSubmitting = true;
    const code = this.digitsControls.value.join('');
    console.log('Verifying 6-digit code:', code);

    const fullPhoneNumber = `${this.twoFactorForm.value.countryCode}${this.twoFactorForm.value.phoneNumber}`;
    // Simulate API request
    //setTimeout(() => {
      this.isSubmitting = false;
      this.systemService.VerifyCode2FA(
        { phone_number: this.user.phone ? this.user.phone :fullPhoneNumber, code: code }
      ).subscribe((response:any) => {
        console.log('response', response);
        if (response.data.success){

          if (!this.user.phone_has_been_verified) {
            //update user
            var user_object = {
              admin_id: this.user.admin_id,
              phone: fullPhoneNumber,
              phone_has_been_verified: true
            }

            this.apisService.UpdateAdmin(user_object).subscribe();
          }
          console.log('here', this.user);

          //check user one more time
          this.authService.currentUserSubject.subscribe((currentUser2) => {
            console.log('one more time', currentUser2);
          });
          
           if (this.user.role == 'admin') {
            console.log('navigate to admin ----------->');
            this.router.navigate(['u/dashboard']);
           }
           else if (this.user.role == 'production-admin') this.router.navigate(['p/production-details']);
           else if (this.user.role == 'executive-admin') this.router.navigate(['e/productions']);
        }
      });

    },1000);
      // Handle success (e.g., redirect to dashboard)
    //}, 1500);
  }

  onResendCode(): void {
    console.log('Resending 2FA code...');
    // Handle resend code logic
    this.isSubmitting = true;
    const fullPhoneNumber = `${this.twoFactorForm.value.countryCode}${this.twoFactorForm.value.phoneNumber}`;

    // Simulate API call to send verification code via Twilio/Backend
    //setTimeout(() => {
    this.isSubmitting = false;
    // Navigate or transition to OTP verification step
    this.systemService.SendCode2FA({
      phone_number: fullPhoneNumber
    }).subscribe(() => {
      this.page = 'verify';
    });
  }
}