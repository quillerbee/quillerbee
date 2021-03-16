<script>
	import { url } from "@roxi/routify";
	import { WaterWave, SocialLinks, CompanyLinks, LegalLinks } from "./";
	import Logo from "../Logo.svelte";
</script>

<footer id="footer" class="w-full">
	<WaterWave />
	<section class="text-left text-white">
		<div class="container px-6 pt-4 mx-auto">
			<div class="lg:flex">
				<div
					class="w-full mb-10 mr-6 lg:w-2/5 lg:border-r lg:border-violet-300">
					<div>
						<div>
							<a
								use:$url
								href="/jobs"
								class="inline-block text-xl font-bold text-white focus:outline-none">
								Quiller Bee
							</a>
						</div>

						<p class="max-w-md pr-1 mt-2 text-gray-300">
							One stop destination for hand curated, high quality,
							jobs from world's most valuable companies!
						</p>
					</div>
				</div>

				<div class="mt-6 lg:mt-0 lg:flex-1">
					<div class="grid grid-cols-2 gap-6 sm:grid-cols-3">
						<CompanyLinks />

						<LegalLinks />

						<div>
							<h3 class="font-semibold text-white uppercase">
								Contact Us
							</h3>
							<a
								href="mailto:hello@quillerbee.com?subject=Hello Quiller Bees"
								class="inline-block mt-2 text-sm text-gray-300 focus:outline-none hover:text-white focus:text-white">
								hello@quillerbee.com
							</a>
						</div>
					</div>
				</div>
			</div>
			<hr class="h-px mt-6 bg-gray-600 border-none" />
		</div>
		<div class="text-gray-400 body-font">
			<div
				class="container flex flex-col items-center px-5 py-8 mx-auto sm:flex-row">
				<div
					class="relative flex items-center justify-center font-medium title-font md:justify-start">
					<Logo />
				</div>
				<p
					class="mt-4 text-sm text-gray-400 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-600 sm:py-2 sm:mt-0">
					© 2021 Quiller Bee
					<br />
					<a
						href="https://twitter.com/quillerbee"
						class="inline-block text-gray-500 focus:outline-none hover:text-white focus:text-white"
						target="_blank"
						rel="noopener noreferrer">
						@quillerbee
					</a>
				</p>
				<SocialLinks />
			</div>
		</div>
	</section>
</footer>
