<template>
    <footer>
        <div class="content">
            <div id="labeli">
                <div>
                    Site d'inscription créé par l'association
                    <a href="http://www.labeli.org" target="_blank">Label[i]</a> et propulsé par <a href="https://kbdev.io"
                                                                                                    target="_blank">KBDev</a>
                </div>
                <div>
                    Support : <a href="mailto:ndi.labeli@gmail.com">ndi.labeli@gmail.com</a>
                </div>
                <div>
                    Sources : <a href="https://github.com/Zadrott/nuitinfo" target="_blank">GitHub</a>
                </div>
            </div>
            <div class="credits">
                <span>En partenariat avec :</span>
                <div class="footer-sponsor-list">
                    <a v-for="partner in sponsors" v-bind:href="partner.website" target="_blank" class="footer-sponsor"
                       v-if="partner.logo !== ''">
                        <img v-bind:src="partner.logo" v-bind:alt="partner.name"/>
                    </a>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
	export default {
		data() {
			return {
				sponsors: [],
			};
		},
		mounted() {
			this.$http.get('/src/data/sponsors/sponsors.json').then(
				(response) => {
					response.json().then((data) => {
						const types = data.sponsors;
						let sponsors = [];
						types.forEach((type) => (sponsors = sponsors.concat(type.partners)));
						this.sponsors = sponsors;
					});
				},
				(error) => {
				},
			);
		},
	};
</script>

<style>
    #labeli {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
    }

    #labeli div {
        padding: 0 1rem 0 0;
    }

    #labeli div:last-child {
        padding: 0;
    }

    .credits {
        margin-top: 8px;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .credits span {
        flex-shrink: 1;
    }

    .footer-sponsor-list {
        flex-grow: 1;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    .footer-sponsor {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        width: 100px;
        height: 40px;
    }

    .footer-sponsor img {
        max-width: 100px;
        max-height: 40px;
        margin: 5px;
    }
</style>
