<template>
    <div id="register" class="page">
        <h1>{{title}}</h1>
        <form v-on:submit.prevent="register" class="userForm">
            <h2 class="title" style="padding-top: 0">Informations de connexion</h2>
            <div class="formField">
                <div class="labelWrapper">
                    <label for="email"><span class="special">Adresse e-mail :</span></label>
                </div>
                <div class="contentWrapper">
                    <input id="email" type="email" v-model="user.email" required="required" autocomplete="username"/>
                </div>
            </div>

            <div class="formField" v-if="!editionMode">
                <div class="labelWrapper">
                    <label for="password"><span class="special">Mot de passe :</span></label>
                </div>
                <div class="contentWrapper">
                    <input id="password" type="password" v-model="user.password" required="required" autocomplete="new-password"/>
                </div>
            </div>

            <h2 class="title" style="padding-top: 0">Informations personnelles</h2>

            <div class="formField">
                <div class="labelWrapper">
                    <label for="firstName"><span class="special">Prénom :</span></label>
                </div>
                <div class="contentWrapper">
                    <input id="firstName" type="text" v-model="user.firstName" required="required"/>
                </div>
            </div>

            <div class="formField">
                <div class="labelWrapper">
                    <label for="lastName"><span class="special">Nom :</span></label>
                </div>
                <div class="contentWrapper">
                    <input id="lastName" type="text" v-model="user.lastName" required="required"/>
                </div>
            </div>

            <div class="formField">
                <div class="labelWrapper">
                    <label for="birthday"><span class="special">Date de naissance :</span></label>
                </div>
                <div class="contentWrapper">
                    <input id="birthday" type="date" v-model="user.birthday" placeholder="dd/mm/aaaa"
                           pattern="(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/](19|20)\d\d"/>
                </div>
            </div>

            <div class="textareaField">
                <div class="labelWrapper">
                    <label for="bio"><span class="special">Biographie :</span></label>
                </div>
                <div class="contentWrapper">
                    <textarea id="bio" v-model="user.biography"></textarea>
                </div>
            </div>

            <h2 class="title">Information scolaires</h2>

            <div class="formField">
                <div class="labelWrapper">
                    <label for="school"><span class="special">Établissement :</span></label>
                </div>
                <div class="contentWrapper">
                    <select id="school" name="school" required="required" v-model="user.school.institution">
                        <option v-for="i in institutions" v-bind:value="i._id">{{i.name}}</option>
                        <option value="0">Autre</option>
                    </select>
                </div>
            </div>
            <div class="formField" v-if="user.school.institution === '0'">
                <div class="labelWrapper">
                    <label for="newInstitution"><span class="special">Autre établissement :</span></label>
                </div>
                <div class="contentWrapper">
                    <input id="newInstitution" type="text" v-model="newInstitution" required="required"/>
                </div>
            </div>

            <div class="formField">
                <div class="labelWrapper">
                    <label for="studyLevel"><span class="special">Année en cours :</span></label>
                </div>
                <div class="contentWrapper">
                    <select id="studyLevel" name="studyLevel" required="required" v-model="user.school.studyYear">
                        <option value="1">Bac +1</option>
                        <option value="2">Bac +2</option>
                        <option value="3">Bac +3</option>
                        <option value="4">Bac +4</option>
                        <option value="5">Bac +5</option>
                    </select>
                </div>
            </div>

            <div class="formField">
                <div class="labelWrapper">
                    <label for="course"><span class="special">Filière :</span></label>
                </div>
                <div class="contentWrapper">
                    <select id="course" name="course" required="required" v-model="user.school.pathway">
                        <option value="Informatique" selected="selected">Informatique (Université/Écoles)</option>
                        <option value="Miage">MIAGE</option>
                        <option value="IUT Info">DUT Informatique</option>
                        <option value="MMI">DUT Métiers du Multimedia et de l'Internet</option>
                        <option value="DAWIN">Licence DAWIN</option>
                        <option value="ACPI">Licence ACPI</option>
                        <option value="BioInfo">Bio-Informatique</option>
                        <option value="0">Autre</option>
                    </select>
                </div>
            </div>
            <div class="formField" v-if="user.school.pathway === '0'">
                <div class="labelWrapper">
                    <label for="newPathway"><span class="special">Autre formation :</span></label>
                </div>
                <div class="contentWrapper">
                    <input id="newPathway" type="text" v-model="newPathway" required="required"/>
                </div>
            </div>

            <h2 class="title">Logistique</h2>
            <div class="checkbox-line">
                <label for="hasMaterial">Comptes-tu apporter <b>ton propre matériel</b> : </label>
                <input type="checkbox" id="hasMaterial" v-model="user.material.hasMaterial"/>
            </div>

            <div class="checkbox-line" style="display:none">
                <label for="isDesktop">Est-ce que tu apporteras <b>un ordinateur fixe</b> : </label>
                <input type="checkbox" id="isDesktop" v-model="user.material.isDesktop"/>
            </div>

            <div class="checkbox-line" style="display:none">
                <label for="hasWiFi">Est ce que ton matériel est équipé du <b>WiFi</b> : </label>
                <input type="checkbox" id="hasWiFi" v-model="user.material.hasWiFi"/>
            </div>


            <h2 class="title">Compte CREMI</h2>
            <div class="checkbox-line">
                <label for="cremiOwner">Possèdes-tu un compte au CREMI : </label>
                <input type="checkbox" id="cremiOwner" v-model="cremiOwner"/>
            </div>

            <div v-if="!cremiOwner">
                <div class="formField">
                    <div class="labelWrapper">
                        <label for="studentNumber"><span class="special">Numéro étudiant :</span></label>
                    </div>
                    <div class="contentWrapper">
                        <input id="studentNumber" type="text" v-model="user.cremiAccount.studentNumber"/>
                    </div>
                </div>
                <div class="formField">
                    <div class="labelWrapper">
                        <label for="studentMail"><span class="special">Adresse e-mail étudiante :</span></label>
                    </div>
                    <div class="contentWrapper">
                        <input id="studentMail" type="text" v-model="user.cremiAccount.studentMail"/>
                    </div>
                </div>

                <div class="checkbox-line">
                    <label for="cremiCharter">Je déclare avoir pris connaissance de la charte d'utilisation du CREMI et
                        de la suivre : </label>
                    <input type="checkbox" id="cremiCharter" v-model="user.cremiAccount.charter"/>
                </div>
            </div>

            <h2 class="title">Recrutement</h2>

            <div class="checkbox-line">
                <label for="mailForRecruitment">J'accepte que mon e-mail soit communiqué à nos partenaires
                    <b>uniquement</b> à des fins de recrutement : </label>
                <input type="checkbox" id="mailForRecruitment" v-model="user.mailForRecruitment"/>
            </div>

            <div class="file-field">
                <label for="curriculumVitae">
                    <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="#bbbbbb"
                         stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-download">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    <div>{{file.name ? `${file.name} (${fileConvertSize(file.size)})` : 'Aucun fichier sélectionné'}}</div>
                    <div class="upload-description" v-if="user.alreadyUploadedCV">Tu as déjà mis en ligne ton CV, mais tu peux le changer si tu
                        le
                        souhaites.<br>
                    </div>
                    <div class="upload-description" v-else>Tu peux ajouter ton CV ici. Celui-ci sera communiqué à nos
                        partenaires, et ils te rappeleront
                        peut-être pour un stage ou bien une alternance ! :)<br>
                        Uniquement en PDF.
                    </div>
                    <input id="curriculumVitae" type="file" @change="loadDataFromFile" accept="application/pdf"/>
                </label>
            </div>

            <div class="actions">
                <router-link class="special" :to="{name: 'home'}">back();</router-link>
                <input type="submit" v-bind:disabled="disabled" class="special" v-bind:value="submitButton"/>
            </div>
        </form>

    </div>
</template>

<script>
	import user from '../stores/UserStore';

	export default {
		data() {
			return {
				title: 'Enregistrement',
				submitButton: 'submit(this);',
				disabled: false,
				file: {
					name: '',
					size: '',
				},
				cremiOwner: false,
				newPathway: '',
				newSchool: '',
				newInstitution: '',
				institutions: [],
				user: {
					email: '',
					password: '',
					firstName: '',
					lastName: '',
					birthday: '',
					biography: '',
					school: {
						institution: '',
						studyYear: 1,
						pathway: 'Informatique',
					},
					material: {
						hasMaterial: true,
						isDesktop: false,
						hasWiFi: true,
					},
					cremiAccount: {
						studentNumber: null,
						studentMail: '',
						charter: false,
					},
					mailForRecruitment: true,
					cv: '',
					alreadyUploadedCV: false,
				},
			};
		},
		computed: {
			editionMode: function() {
				return this.$route.path === '/user/edit' || this.$route.path === '/user/edit/';
			},
		},
		mounted() {
			this.$http.get('/api/institution').then((response) => {
				if (response.status === 200) {
					response.json().then((message) => {
						this.institutions = message.data;
					});
				}
			});

			if (this.editionMode) {
				this.title = 'Édition de profil';
				this.$http
					.get('/api/user/me', { headers: { Authorization: 'JWT ' + user.getToken() } })
					.then(
						(response) => {
							response.json().then((message) => {
								if (message.success === 1) {
									user.setUser(message.data);
									this.user = message.data;
									this.user.birthday = this.user.birthday.slice(0, 10);
									this.cremiOwner = !message.data.cremiAccount.needed;
								}
							});
						},
						(response) => {
							console.warn('Erreur de récupération des informations de profil');
						},
					);
			}
		},
		methods: {
			fileConvertSize(aSize) {
				aSize = Math.abs(parseInt(aSize, 10));
				let def = [
					[1, 'octets'],
					[1024, 'ko'],
					[1024 * 1024, 'Mo'],
					[1024 * 1024 * 1024, 'Go'],
					[1024 * 1024 * 1024 * 1024, 'To'],
				];
				for (let i = 0; i < def.length; i++) {
					if (aSize < def[i][0])
						return (aSize / def[i - 1][0]).toFixed(2) + ' ' + def[i - 1][1];
				}
			},
			loadDataFromFile(ev) {
				const file = ev.target.files[0];
				const reader = new FileReader();
				this.file = { name: file.name, size: file.size };

				reader.onload = (e) => {
					if (reader.result) {
						this.user.cv = reader.result;
						console.log({ cv: this.user.cv });
					}
				};
				reader.readAsDataURL(file);
			},
			openFile() {
				window.open(this.cv);
			},
			register() {
				const send = () => {
					this.submitButton = 'sending(this)...';
					this.disabled = true;
					if (this.editionMode) {
						this.$http
							.put('/api/user', JSON.stringify(this.user), {
								headers: { Authorization: 'JWT ' + user.getToken() },
							})
							.then(
								(response) => {
									this.$router.push({ name: 'dashboard' });
								},
								(error) => {
									this.submitButton = 'submit(this);';
									this.disabled = false;
									console.warn('Erreur de modification');
									error.json().then((message) => {
										alert(message.message);
									});
								},
							);
					} else {
						this.$http.post('/api/user', JSON.stringify(this.user)).then(
							(response) => {
								this.$router.push({ name: 'login' });
							},
							(error) => {
								this.submitButton = 'submit(this);';
								this.disabled = false;
								console.warn('Erreur d\'ajout d\'un utilisateur');
								error.json().then((message) => {
									alert(message.message);
								});
							},
						);
					}
				};

				this.user.cremiAccount.needed = !this.cremiOwner;
				if (this.user.school.pathway === '0') {
					this.user.school.pathway = this.newPathway;
				}
				if (this.user.school.institution === '0') {
					this.$http
						.post('/api/institution', JSON.stringify({ name: this.newInstitution }))
						.then(
							(response) => {
								if (response.status === 200) {
									response.json().then((message) => {
										this.user.school.institution = message.data._id;
										send();
									});
								}
							},
							(error) => {
								console.warn('Erreur d\'ajout d\'une institution');
								error.json().then((message) => {
									alert(message.message);
								});
							},
						);
				} else {
					send();
				}
			},
		},
	};
</script>

<style>
    @media screen and (min-width: 700px) {
        #register {
            padding: 10px 10px 5vh;
            max-width: 1200px;
            margin: 0 auto;
        }
    }

    .checkbox-line {
        display: flex;
        flex-direction: row;
    }

    .file-field {
        margin-top: 8px;
        border: solid 1px white;
    }

    .file-field label {
        background: rgba(255, 255, 255, 0.1);
        border: dashed 2px white;
        border-radius: 5px;
        padding: 40px;
        margin: 8px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .file-field * {
        cursor: pointer;
    }

    .file-field input {
        display: none;
    }

    .upload-description {
        margin-top: 10px;
        font-style: italic;
        font-weight: lighter;
    }
</style>
