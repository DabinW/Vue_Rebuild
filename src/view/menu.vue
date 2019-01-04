<template>
	<el-col :span="24" class="content-wrapper">
		<transition name="fade" mode="out-in">
			<router-view></router-view>
		</transition>
	</el-col>	
</template>