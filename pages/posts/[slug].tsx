import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import PostBody from '../../components/post-body'
import Header from '../../components/header'
import PostHeader from '../../components/post-header'
import Layout from '../../components/layout'
import { getPostBySlug, getAllPosts } from '../../lib/api'
import PostTitle from '../../components/post-title'
import Head from 'next/head'
import { CMS_NAME } from '../../lib/constants'
import markdownToHtml from '../../lib/markdownToHtml'
import PostType from '../../types/post'

import Login from '../../components/login'
import { useCookies } from 'react-cookie'
import Logout from '../../components/logout'

type Props = {
	post: PostType
	morePosts: PostType[]
	preview?: boolean
}

const Post = ({ post, morePosts, preview }: Props) => {
	const [cookies, setCookie, removeCookie] = useCookies(['logged-in'])
	const router = useRouter()
	if (!router.isFallback && !post?.slug) {
		return <ErrorPage statusCode={404} />
	}

	return (
		<Layout preview={preview}>
			{cookies['logged-in'] && <Logout removeCookie={removeCookie} />}
			<Container>
				<Header />
				{router.isFallback ? (
					<PostTitle>Loading…</PostTitle>
				) : (
					<>
						<article className='mb-32'>
							<Head>
								<title>
									{post.title} | Next.js Blog Example with {CMS_NAME}
								</title>
								<meta property='og:image' content={post.ogImage.url} />
							</Head>
							<PostHeader
								title={post.title}
								coverImage={post.coverImage}
								date={post.date}
								author={post.author}
								premium={post.premium}
							/>
							{!post.premium || cookies['logged-in'] ? (
								<PostBody content={post.content} />
							) : (
								<Login setCookie={setCookie} />
							)}
						</article>
					</>
				)}
			</Container>
		</Layout>
	)
}

export default Post

type Params = {
	params: {
		slug: string
	}
}

export async function getStaticProps({ params }: Params) {
	const post = getPostBySlug(params.slug, [
		'title',
		'date',
		'slug',
		'author',
		'content',
		'ogImage',
		'coverImage',
		'premium',
	])
	const content = await markdownToHtml(post.content || '')

	return {
		props: {
			post: {
				...post,
				content,
			},
		},
	}
}

export async function getStaticPaths() {
	const posts = getAllPosts(['slug'])

	return {
		paths: posts.map((post) => {
			return {
				params: {
					slug: post.slug,
				},
			}
		}),
		fallback: false,
	}
}
