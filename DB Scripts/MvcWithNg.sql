USE [master]
GO
/****** Object:  Database [MvcWithNG]    Script Date: 9/26/2014 9:00:19 PM ******/
CREATE DATABASE [MvcWithNG]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'MvcWithNG', FILENAME = N'c:\Program Files\Microsoft SQL Server\MSSQL11.MSSQL2012\MSSQL\DATA\MvcWithNG.mdf' , SIZE = 3136KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'MvcWithNG_log', FILENAME = N'c:\Program Files\Microsoft SQL Server\MSSQL11.MSSQL2012\MSSQL\DATA\MvcWithNG_log.ldf' , SIZE = 784KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [MvcWithNG] SET COMPATIBILITY_LEVEL = 100
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [MvcWithNG].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [MvcWithNG] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [MvcWithNG] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [MvcWithNG] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [MvcWithNG] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [MvcWithNG] SET ARITHABORT OFF 
GO
ALTER DATABASE [MvcWithNG] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [MvcWithNG] SET AUTO_CREATE_STATISTICS ON 
GO
ALTER DATABASE [MvcWithNG] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [MvcWithNG] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [MvcWithNG] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [MvcWithNG] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [MvcWithNG] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [MvcWithNG] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [MvcWithNG] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [MvcWithNG] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [MvcWithNG] SET  DISABLE_BROKER 
GO
ALTER DATABASE [MvcWithNG] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [MvcWithNG] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [MvcWithNG] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [MvcWithNG] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [MvcWithNG] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [MvcWithNG] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [MvcWithNG] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [MvcWithNG] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [MvcWithNG] SET  MULTI_USER 
GO
ALTER DATABASE [MvcWithNG] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [MvcWithNG] SET DB_CHAINING OFF 
GO
ALTER DATABASE [MvcWithNG] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [MvcWithNG] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
USE [MvcWithNG]
GO
/****** Object:  Table [dbo].[Bookmark]    Script Date: 9/26/2014 9:00:20 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Bookmark](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Url] [varchar](max) NOT NULL,
	[Title] [varchar](50) NULL,
	[Tags] [varchar](max) NULL,
	[Date] [datetime] NOT NULL,
	[Active] [bit] NOT NULL,
 CONSTRAINT [PK__Bookmark__3214EC077F60ED59] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Log]    Script Date: 9/26/2014 9:00:20 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Log](
	[LogId] [int] IDENTITY(1,1) NOT NULL,
	[Date] [datetime] NOT NULL,
 CONSTRAINT [PK_Log] PRIMARY KEY CLUSTERED 
(
	[LogId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[User]    Script Date: 9/26/2014 9:00:20 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[User](
	[UserID] [int] IDENTITY(1,1) NOT NULL,
	[BookmarkId] [int] NOT NULL,
	[Name] [varchar](50) NOT NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  View [dbo].[vBookmarks]    Script Date: 9/26/2014 9:00:20 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[vBookmarks]
AS
SELECT     Id, Url, Date, Tags, Title, Active
FROM         dbo.Bookmark

GO
SET IDENTITY_INSERT [dbo].[Bookmark] ON 

INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (13, N'angularjs.org', NULL, N'ng, angular', CAST(N'2013-08-30 16:07:38.563' AS DateTime), 0)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (14, N'radixweb.net', NULL, N'local', CAST(N'2013-08-30 18:24:12.797' AS DateTime), 0)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (15, N'sd', NULL, N'sd', CAST(N'2013-08-30 18:24:48.663' AS DateTime), 0)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (16, N'wew', NULL, N'we', CAST(N'2013-08-30 18:24:55.623' AS DateTime), 0)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (17, N'http://www.mojoportal.com/adding-a-host-name-to-the-hosts-file-for-local-testing', N'Add Host name to localhost', N'IIS', CAST(N'2013-08-30 19:29:49.790' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (18, N'http://www.templatemo.com/preview/templatemo_303_mini_wave', N'abc', N'theme', CAST(N'2013-08-31 11:12:55.297' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (19, N'http://www.templatemo.com/preview/templatemo_175_gift_blog', N'abc', N'theme', CAST(N'2013-08-31 11:13:46.940' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (20, N'http://www.templatemo.com/preview/templatemo_169_garden', N'abc', N'theme', CAST(N'2013-08-31 11:14:17.217' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (21, N'http://www.templatemo.com/preview/templatemo_127_mini_site', NULL, N'', CAST(N'2013-08-31 11:15:13.690' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (22, N'http://www.templatemo.com/preview/templatemo_065_office', NULL, N'theme', CAST(N'2013-08-31 11:17:11.603' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (23, N'http://www.templatemo.com/preview/templatemo_049_studio', NULL, N'theme', CAST(N'2013-08-31 11:18:10.523' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (24, N'http://www.templatemo.com/preview/templatemo_049_studio', NULL, N'theme', CAST(N'2013-08-31 11:19:39.307' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (25, N'http://www.templatemo.com/preview/templatemo_031_artist', NULL, N'theme', CAST(N'2013-08-31 11:20:04.483' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (26, N'http://all-free-download.com/free-website-templates/audio_lovers_template_2383.html', NULL, N'theme', CAST(N'2013-08-31 11:25:16.853' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (27, N'http://www.solucija.com/template/happy-template', NULL, N'theme', CAST(N'2013-08-31 11:42:11.107' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (28, N'test theme', NULL, N'theme ,  new', CAST(N'2013-08-31 11:54:34.620' AS DateTime), 0)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (29, N'notheme', NULL, N'random', CAST(N'2013-08-31 11:55:33.980' AS DateTime), 0)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (30, N'http://www.codeproject.com/Articles/286255/Using-LINQ-Queries', NULL, N'Linq', CAST(N'2013-08-31 12:13:25.173' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (31, N'http://geekswithblogs.net/michelotti/archive/2011/05/28/resolve-404-in-iis-express-for-put-and-delete-verbs.aspx', N'IIS Verb Setting', N'delete / put', CAST(N'2013-08-31 12:31:33.030' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (32, N'test BM', NULL, N'Random', CAST(N'2013-08-31 12:43:40.027' AS DateTime), 0)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (33, N'http://www.sitepoint.com/css3-ajax-loading-icon/', N'Loaders', N'loader', CAST(N'2013-08-31 12:47:45.310' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (34, N'http://onehungrymind.com/angularjs-directives-basics/', N'Angular directives basic', N'angular', CAST(N'2013-09-02 19:08:47.153' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (35, N'http://tahuko.com/?p=407', N'Kon jhulave pipdi', N'gujarati', CAST(N'2013-09-03 11:18:31.817' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (36, N'http://tahuko.com/?p=943', N'Panni ne pahtay to keto ni', N'gujarati', CAST(N'2013-09-03 11:19:21.297' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (37, N'http://tahuko.com/?p=1505', N'chomasu aas-pas 6', N'gujarati', CAST(N'2013-09-03 11:26:57.177' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (38, N'http://tahuko.com/?p=819', N'priya papa tamara vagar', N'gujarati', CAST(N'2013-09-03 11:33:35.863' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (39, N'http://tahuko.com/?p=614', N'Priyatam- Mehul Surti', N'gujarati', CAST(N'2013-09-03 11:36:31.050' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (40, N'http://localhost:59016/Apps/BookmarkMe/index.html', N'BookMe', N'BookMe', CAST(N'2013-09-03 13:27:51.743' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (41, N'http://www.ajaxload.info/', N'Loader', N'loader', CAST(N'2013-09-03 16:32:35.787' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (42, N'http://loadergenerator.com/', N'Loader', N'Loader', CAST(N'2013-09-03 16:34:06.313' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (44, N'http://tutorialzine.com/2013/08/learn-angularjs-5-examples/', N'Angular Examples', N'angular', CAST(N'2013-09-27 00:00:00.000' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (45, N'http://jschr.github.io/bootstrap-modal/', N'Modal Pop-up demo', N'modal demo', CAST(N'2013-09-27 00:00:00.000' AS DateTime), 0)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (46, N'test', N'test', N'test', CAST(N'2013-09-27 12:18:31.087' AS DateTime), 0)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (47, N'test', N'test', N'test', CAST(N'2013-09-27 12:33:56.503' AS DateTime), 0)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (48, N'test', N'test', NULL, CAST(N'2013-09-27 12:35:39.870' AS DateTime), 0)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (49, N'http://jschr.github.io/bootstrap-modal/', N'bootstrap samples', N'bootstrap samples', CAST(N'2013-09-27 12:38:21.367' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (50, N'http://prezi.com/kedmyhgohdaq/knockout-vs-angularjs/', N'AngularJS v/s KnockoutJS', N'difference, angularJS, knockout', CAST(N'2013-09-27 13:05:19.097' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (51, N'test', N'test', N'test', CAST(N'2013-09-28 11:07:41.997' AS DateTime), 0)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (52, N'http://www.cheatography.com/proloser/cheat-sheets/angularjs/', N'Angular Cheatsheet', N'angular, syntax', CAST(N'2013-09-28 13:42:16.677' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (53, N'http://12devs.co.uk/articles/rapid-prototyping-with-angularjs/', N'AngularJS Prototyping', NULL, CAST(N'2013-09-30 18:20:35.457' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (54, N'https://github.com/ccoenraets/angular-cellar', N'Angular Wine Cellar App', N'Angular', CAST(N'2013-10-01 11:35:19.210' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (55, N'http://coenraets.org/blog/2012/02/sample-application-with-angular-js/', N'Angular Wine Cellar', N'', CAST(N'2013-10-01 11:35:57.337' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (56, N'http://onehungrymind.com/angularjs-communicating-between-controllers/', N'AngularJS Broadcast', N'injector, angularjs', CAST(N'2013-10-02 18:04:06.623' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (57, N'https://www.vacationlabs.com/software-development-jobs-in-goa', NULL, NULL, CAST(N'2013-10-02 19:00:38.683' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (58, N'http://192.168.100.142:8081/login.vibe', N'Song server1', N'song server', CAST(N'2013-10-03 11:06:28.613' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (59, N'http://www.ehow.com/how_8787687_toast-bread-microwave.html', N'toast in microwave', N'food, toast', CAST(N'2013-10-04 12:38:49.920' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (60, N'http://www.ehow.com/how_6687468_make-toast-microwave-oven.html', N'Toast in microwave', N'Food, Toast', CAST(N'2013-10-04 12:39:42.983' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (61, N'http://buzztheme.net/templates/download-stilearn-metro-admin-template-wrapbootstrap.html', N'stilearn metro', N'theme', CAST(N'2013-10-08 17:48:02.367' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (62, N'http://forums.asp.net/t/1911234.aspx?how+to+create+reports+in+Asp+net+MVC3+application', N'create reports in Asp.net MVC3', N'print, pdf', CAST(N'2013-10-10 14:29:56.750' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (63, N'http://www.codeproject.com/Articles/260470/PDF-reporting-using-ASP-NET-MVC3', N'PDF reporting using ASP.NET MVC3', N'print, pdf', CAST(N'2013-10-10 14:30:38.000' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (64, N'http://mvc-tutorials.com/how-to-create-pdf-report-in-asp-net-mvc3', N'Create PDF report in ASP.NET MVC3', N'pdf, report, print', CAST(N'2013-10-10 14:32:52.370' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (65, N'http://jsfiddle.net/pfqKY/51/', N'Vertical Sum Using Angular', N'Angular, sum', CAST(N'2013-10-10 18:15:58.777' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (66, N'http://stackoverflow.com/questions/7652981/chrome-window-print-window-close-results-in-print-preview-failed-solution', N'Printing Issues', N'window.print', CAST(N'2013-10-17 17:28:01.607' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (67, N'http://www.javascriptkit.com/javatutors/ie5print.shtml', N'Printing Issues', N'window.print', CAST(N'2013-10-17 17:28:53.823' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (68, N'http://code.google.com/p/chromium/issues/detail?id=92107', N'Printing Issues', N'window.print', CAST(N'2013-10-17 17:29:13.770' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (69, N'http://www.jquery4u.com/plugins/10-jquery-print-page-options/', N'10 Jquery Print options', N'print , jquery', CAST(N'2013-10-18 11:24:13.767' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (70, N'http://jquery-print.ssdtutorials.com/', N'Jquery PrintArea Tutorial', N'jquery, print', CAST(N'2013-10-18 13:49:40.010' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (71, N'http://sectionseven.com/index2.html', N':)', N'', CAST(N'2013-10-18 13:57:25.713' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (72, N'http://www.sitepoint.com/12-creative-clever-preloader-designs/', N'Preloaders', N'', CAST(N'2013-10-18 14:05:45.073' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (73, N'http://www.befundoo.com/university/tutorials/angularjs-directives-tutorial/', N'AngularJS star rating directive', N'angularjs, directive, example', CAST(N'2013-10-19 11:32:33.227' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (74, N'http://www.codeproject.com/Articles/12475/Some-Cool-Tips-for-NET#tip3.8.2', N'Cool .Net Tips', N'Tips', CAST(N'2013-10-19 13:33:05.897' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (75, N'http://www.foodnetwork.com/recipes-and-cooking/50-egg-ideas/index.html', N'eggs recepies', N'eggs, food', CAST(N'2013-10-22 11:47:42.060' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (76, N'http://www.incredibleegg.org/recipes', N'eggs recepies', N'food, eggs', CAST(N'2013-10-22 11:49:30.683' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (77, N'javascript:function D(a,b){c=b.split(''|'');d=false;for(q=0;q<c.length;q++){if(c[q]==a)d=true;}return d;}function E(){f0=document.forms[0];if(f0[''passengers[0].passengerName''])f0[''passengers[0].passengerName''].value=''Parimal Gajjar'';if(f0[''passengers[0].passengerAge''])f0[''passengers[0].passengerAge''].value=''33'';if(f0[''passengers[0].passengerSex''])f0[''passengers[0].passengerSex''].value=''m'';if(f0[''passengers[0].berthPreffer''])f0[''passengers[0].berthPreffer''].value=''Upper'';if(f0[''passengers[0].idCardType''])f0[''passengers[0].idCardType''].value=''PANC'';if(f0[''passengers[0].idCardNo''])f0[''passengers[0].idCardNo''].value=''AIWPG2934P'';if(f0[''passengers[1].idCardType''])f0[''passengers[1].idCardType''].value=''0'';if(f0[''passengers[2].idCardType''])f0[''passengers[2].idCardType''].value=''0'';if(f0[''passengers[3].idCardType''])f0[''passengers[3].idCardType''].value=''0'';if(f0[''passengers[4].idCardType''])f0[''passengers[4].idCardType''].value=''0'';if(f0[''passengers[5].idCardType''])f0[''passengers[5].idCardType''].value=''0'';if(f0[''mobileNumber''])f0[''mobileNumber''].value=''8886953111'';}E()', N'Parimal Irctc', N'irctc', CAST(N'2013-11-08 09:48:42.483' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (78, N'Test', N'Test', N'', CAST(N'2013-11-08 14:10:46.903' AS DateTime), 0)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (79, N'Test Node 71', NULL, NULL, CAST(N'2013-11-09 11:28:15.533' AS DateTime), 0)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (80, N'http://msdn.microsoft.com/en-us/library/vstudio/ms171890.aspx', N'Win Form Sample', NULL, CAST(N'2013-11-09 13:19:18.807' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (81, N'http://stackoverflow.com/questions/18875486/setting-dynamic-scope-variables-in-angularjs-scope-some-string', N'Dynamic Scope', N'angularjs, scope, dynamic scope', CAST(N'2013-11-11 11:52:25.237' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (82, N'http://www.instructables.com/id/How-To-Make-Paper-Roses/', N'Paper Rose', N'', CAST(N'2013-11-11 12:33:20.693' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (83, N'http://www.instructables.com/id/Easiest-Paper-Pop-Up-Card.-From-Amazing-Paper./', N'paper pop-up card', N'', CAST(N'2013-11-11 12:33:46.067' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (84, N'http://www.bloom4ever.com/howto-origami-rose.php', N'Oragami-Rose index page', NULL, CAST(N'2013-11-11 12:34:16.230' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (85, N'http://www.bloom4ever.com/origami-rose-valentine.php', N'origami-rose 1', N'', CAST(N'2013-11-11 12:34:44.230' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (86, N'http://www.bloom4ever.com/easy-origami-rose-02.php', N'origami-rose 2', N'', CAST(N'2013-11-11 12:35:03.627' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (87, N'http://onehungrymind.com/notes-on-angularjs-scope-life-cycle/', N'angularJs scope article', N'angularjs, scope', CAST(N'2013-11-28 18:54:51.867' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (88, N'http://www.zeekhanakhazana.com/recipe/egg-kebabs', N'Egg Kebabs', N'food, egg', CAST(N'2013-12-03 09:59:17.970' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (89, N'http://wall.alphacoders.com/big.php?i=317175', N'Notes Wallpaper', N'img, wallpaper', CAST(N'2013-12-03 10:43:01.037' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (90, N'http://wall.alphacoders.com/big.php?i=350736', N'My Wish 4 U', N'img, wallpaper', CAST(N'2013-12-03 10:44:37.247' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (91, N'http://wall.alphacoders.com/by_collection.php?id=303', N'jaguar f-type', NULL, CAST(N'2013-12-04 10:33:01.220' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (92, N'http://www.cityshor.com/ahmedabad/screen-n-spice-indias-first-movie-and-dinning-concept-now-in-ahmedabad', N'Movie and Dinning', N'Movie, Food', CAST(N'2013-12-10 18:07:15.250' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (93, N'http://tahuko.com/?p=750', N'Dosi Dosa ne', N'gujarati', CAST(N'2013-12-21 11:23:23.910' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (94, N'http://angular-ui.github.io/bootstrap/', N'Angular UI', N'Angular', CAST(N'2014-01-11 13:47:50.110' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (1094, N'http://www.ng-newsletter.com/posts/validations.html', N'Angular Validations', N'Angular, Validations', CAST(N'2014-03-03 17:37:44.240' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (1095, N'http://en.wikipedia.org/wiki/Conductive_hearing_losses', N'Conductive_hearing_losses', NULL, CAST(N'2014-04-16 19:55:08.230' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (1096, N'http://en.wikipedia.org/wiki/Unilateral_hearing_loss', N'Unilateral_hearing_loss', N'', CAST(N'2014-04-16 19:55:21.570' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (1097, N'http://en.wikipedia.org/wiki/Cochlear_Baha', N'Cochlear_Baha', N'', CAST(N'2014-04-16 19:55:33.460' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (1098, N'http://www.istartedsomething.com/bingimages/#20140420-uk', N'Bing duckling', NULL, CAST(N'2014-04-21 19:04:37.837' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (2098, N'http://plnkr.co/edit/aagVasV0M4Lpgdx2CbfX?p=preview', N'BeFundoo Assignment', N'Befundoo, fundoo', CAST(N'2014-05-15 10:59:47.320' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (2099, N'http://buzzgfx.com/', N'theme', NULL, CAST(N'2014-05-20 19:17:06.393' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (2100, N'https://docs.angularjs.org/guide/directive', N'Directive guide', N'Angular js, directive', CAST(N'2014-06-02 11:37:15.597' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (2101, N'https://docs.angularjs.org/guide/migration', N'migrate from 1.0 to 1.2', N'Angular js, directive', CAST(N'2014-06-02 19:13:45.917' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (2102, N'http://haacked.com/archive/2010/07/16/uploading-files-with-aspnetmvc.aspx/', N'Upload files MVC', NULL, CAST(N'2014-06-16 12:10:38.297' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (2103, N'http://httpjunkie.com/2014/724/mvc-5-image-upload-delete/', N'MVC- file delete', N'', CAST(N'2014-06-16 12:11:57.640' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (2104, N'http://stackoverflow.com/questions/5193842/file-upload-asp-net-mvc-3-0', N'Upload files MVC', N'', CAST(N'2014-06-16 12:12:50.703' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (2105, N'http://stackoverflow.com/questions/5405014/in-and-not-in-with-linq-to-entities-ef4-0', N'IN / Not in queries in EF', NULL, CAST(N'2014-06-18 15:23:21.053' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (2109, N'http://www.templatemo.com/download/templatemo_395_urbanic', N'Theme', N'theme', CAST(N'2014-07-19 11:13:03.193' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (3109, N'http://scotch.io/tutorials/javascript/angularjs-form-validation', N'AngularJS Form Validation', N'angular', CAST(N'2014-09-26 14:11:32.840' AS DateTime), 1)
INSERT [dbo].[Bookmark] ([Id], [Url], [Title], [Tags], [Date], [Active]) VALUES (3110, N'http://scotch.io/quick-tips/js/angular/pretty-urls-in-angularjs-removing-the-hashtag', N'Pretty URLs in AngularJS: Removing the #', N'Angular , html5mode', CAST(N'2014-09-26 14:18:16.330' AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[Bookmark] OFF
SET IDENTITY_INSERT [dbo].[Log] ON 

INSERT [dbo].[Log] ([LogId], [Date]) VALUES (6, CAST(N'2013-08-30 16:07:38.563' AS DateTime))
INSERT [dbo].[Log] ([LogId], [Date]) VALUES (7, CAST(N'2013-08-30 18:24:12.797' AS DateTime))
INSERT [dbo].[Log] ([LogId], [Date]) VALUES (8, CAST(N'2013-08-30 18:24:48.663' AS DateTime))
INSERT [dbo].[Log] ([LogId], [Date]) VALUES (9, CAST(N'2013-08-30 18:24:55.623' AS DateTime))
INSERT [dbo].[Log] ([LogId], [Date]) VALUES (10, CAST(N'2013-08-30 19:29:49.790' AS DateTime))
INSERT [dbo].[Log] ([LogId], [Date]) VALUES (11, CAST(N'2013-08-31 11:12:55.297' AS DateTime))
INSERT [dbo].[Log] ([LogId], [Date]) VALUES (12, CAST(N'2013-08-31 11:13:46.940' AS DateTime))
INSERT [dbo].[Log] ([LogId], [Date]) VALUES (13, CAST(N'2013-08-31 11:14:17.217' AS DateTime))
INSERT [dbo].[Log] ([LogId], [Date]) VALUES (14, CAST(N'2013-08-31 11:15:13.690' AS DateTime))
INSERT [dbo].[Log] ([LogId], [Date]) VALUES (15, CAST(N'2013-08-31 11:17:11.603' AS DateTime))
INSERT [dbo].[Log] ([LogId], [Date]) VALUES (16, CAST(N'2013-08-31 11:18:10.523' AS DateTime))
INSERT [dbo].[Log] ([LogId], [Date]) VALUES (17, CAST(N'2013-08-31 11:19:39.307' AS DateTime))
INSERT [dbo].[Log] ([LogId], [Date]) VALUES (18, CAST(N'2013-08-31 11:20:04.483' AS DateTime))
INSERT [dbo].[Log] ([LogId], [Date]) VALUES (19, CAST(N'2013-08-31 11:25:16.853' AS DateTime))
INSERT [dbo].[Log] ([LogId], [Date]) VALUES (20, CAST(N'2013-08-31 11:42:11.107' AS DateTime))
INSERT [dbo].[Log] ([LogId], [Date]) VALUES (21, CAST(N'2013-08-31 11:54:34.620' AS DateTime))
INSERT [dbo].[Log] ([LogId], [Date]) VALUES (22, CAST(N'2013-08-31 11:55:33.980' AS DateTime))
INSERT [dbo].[Log] ([LogId], [Date]) VALUES (23, CAST(N'2013-08-31 12:13:25.173' AS DateTime))
INSERT [dbo].[Log] ([LogId], [Date]) VALUES (24, CAST(N'2013-08-31 12:31:33.030' AS DateTime))
INSERT [dbo].[Log] ([LogId], [Date]) VALUES (25, CAST(N'2013-08-31 12:43:40.027' AS DateTime))
INSERT [dbo].[Log] ([LogId], [Date]) VALUES (26, CAST(N'2013-08-31 12:47:45.310' AS DateTime))
INSERT [dbo].[Log] ([LogId], [Date]) VALUES (27, CAST(N'2013-09-02 19:08:47.153' AS DateTime))
INSERT [dbo].[Log] ([LogId], [Date]) VALUES (28, CAST(N'2013-09-03 11:18:31.817' AS DateTime))
INSERT [dbo].[Log] ([LogId], [Date]) VALUES (29, CAST(N'2013-09-03 11:19:21.297' AS DateTime))
INSERT [dbo].[Log] ([LogId], [Date]) VALUES (30, CAST(N'2013-09-03 11:26:57.177' AS DateTime))
INSERT [dbo].[Log] ([LogId], [Date]) VALUES (31, CAST(N'2013-09-03 11:33:35.863' AS DateTime))
INSERT [dbo].[Log] ([LogId], [Date]) VALUES (32, CAST(N'2013-09-03 11:36:31.050' AS DateTime))
SET IDENTITY_INSERT [dbo].[Log] OFF
SET IDENTITY_INSERT [dbo].[User] ON 

INSERT [dbo].[User] ([UserID], [BookmarkId], [Name]) VALUES (6, 13, N'ng, angular')
INSERT [dbo].[User] ([UserID], [BookmarkId], [Name]) VALUES (7, 14, N'local')
INSERT [dbo].[User] ([UserID], [BookmarkId], [Name]) VALUES (8, 15, N'sd')
INSERT [dbo].[User] ([UserID], [BookmarkId], [Name]) VALUES (9, 16, N'we')
INSERT [dbo].[User] ([UserID], [BookmarkId], [Name]) VALUES (10, 17, N'IIS')
INSERT [dbo].[User] ([UserID], [BookmarkId], [Name]) VALUES (11, 18, N'theme')
INSERT [dbo].[User] ([UserID], [BookmarkId], [Name]) VALUES (12, 19, N'theme')
INSERT [dbo].[User] ([UserID], [BookmarkId], [Name]) VALUES (13, 20, N'theme')
INSERT [dbo].[User] ([UserID], [BookmarkId], [Name]) VALUES (14, 21, N'')
INSERT [dbo].[User] ([UserID], [BookmarkId], [Name]) VALUES (15, 22, N'theme')
INSERT [dbo].[User] ([UserID], [BookmarkId], [Name]) VALUES (16, 23, N'theme')
INSERT [dbo].[User] ([UserID], [BookmarkId], [Name]) VALUES (17, 24, N'theme')
INSERT [dbo].[User] ([UserID], [BookmarkId], [Name]) VALUES (18, 25, N'theme')
INSERT [dbo].[User] ([UserID], [BookmarkId], [Name]) VALUES (19, 26, N'theme')
INSERT [dbo].[User] ([UserID], [BookmarkId], [Name]) VALUES (20, 27, N'theme')
INSERT [dbo].[User] ([UserID], [BookmarkId], [Name]) VALUES (21, 28, N'theme ,  new')
INSERT [dbo].[User] ([UserID], [BookmarkId], [Name]) VALUES (22, 29, N'random')
INSERT [dbo].[User] ([UserID], [BookmarkId], [Name]) VALUES (23, 30, N'Linq')
INSERT [dbo].[User] ([UserID], [BookmarkId], [Name]) VALUES (24, 31, N'delete / put')
INSERT [dbo].[User] ([UserID], [BookmarkId], [Name]) VALUES (25, 32, N'Random')
INSERT [dbo].[User] ([UserID], [BookmarkId], [Name]) VALUES (26, 33, N'loader')
INSERT [dbo].[User] ([UserID], [BookmarkId], [Name]) VALUES (27, 34, N'angular')
INSERT [dbo].[User] ([UserID], [BookmarkId], [Name]) VALUES (28, 35, N'gujarati')
INSERT [dbo].[User] ([UserID], [BookmarkId], [Name]) VALUES (29, 36, N'gujarati')
INSERT [dbo].[User] ([UserID], [BookmarkId], [Name]) VALUES (30, 37, N'gujarati')
INSERT [dbo].[User] ([UserID], [BookmarkId], [Name]) VALUES (31, 38, N'gujarati')
INSERT [dbo].[User] ([UserID], [BookmarkId], [Name]) VALUES (32, 39, N'gujarati')
SET IDENTITY_INSERT [dbo].[User] OFF
ALTER TABLE [dbo].[User]  WITH CHECK ADD  CONSTRAINT [FK_User_Bookmark] FOREIGN KEY([BookmarkId])
REFERENCES [dbo].[Bookmark] ([Id])
GO
ALTER TABLE [dbo].[User] CHECK CONSTRAINT [FK_User_Bookmark]
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane1', @value=N'[0E232FF0-B466-11cf-A24F-00AA00A3EFFF, 1.00]
Begin DesignProperties = 
   Begin PaneConfigurations = 
      Begin PaneConfiguration = 0
         NumPanes = 4
         Configuration = "(H (1[40] 4[20] 2[20] 3) )"
      End
      Begin PaneConfiguration = 1
         NumPanes = 3
         Configuration = "(H (1 [50] 4 [25] 3))"
      End
      Begin PaneConfiguration = 2
         NumPanes = 3
         Configuration = "(H (1 [50] 2 [25] 3))"
      End
      Begin PaneConfiguration = 3
         NumPanes = 3
         Configuration = "(H (4 [30] 2 [40] 3))"
      End
      Begin PaneConfiguration = 4
         NumPanes = 2
         Configuration = "(H (1 [56] 3))"
      End
      Begin PaneConfiguration = 5
         NumPanes = 2
         Configuration = "(H (2 [66] 3))"
      End
      Begin PaneConfiguration = 6
         NumPanes = 2
         Configuration = "(H (4 [50] 3))"
      End
      Begin PaneConfiguration = 7
         NumPanes = 1
         Configuration = "(V (3))"
      End
      Begin PaneConfiguration = 8
         NumPanes = 3
         Configuration = "(H (1[56] 4[18] 2) )"
      End
      Begin PaneConfiguration = 9
         NumPanes = 2
         Configuration = "(H (1 [75] 4))"
      End
      Begin PaneConfiguration = 10
         NumPanes = 2
         Configuration = "(H (1[66] 2) )"
      End
      Begin PaneConfiguration = 11
         NumPanes = 2
         Configuration = "(H (4 [60] 2))"
      End
      Begin PaneConfiguration = 12
         NumPanes = 1
         Configuration = "(H (1) )"
      End
      Begin PaneConfiguration = 13
         NumPanes = 1
         Configuration = "(V (4))"
      End
      Begin PaneConfiguration = 14
         NumPanes = 1
         Configuration = "(V (2))"
      End
      ActivePaneConfig = 0
   End
   Begin DiagramPane = 
      Begin Origin = 
         Top = 0
         Left = 0
      End
      Begin Tables = 
         Begin Table = "Bookmark"
            Begin Extent = 
               Top = 6
               Left = 38
               Bottom = 165
               Right = 198
            End
            DisplayFlags = 280
            TopColumn = 0
         End
      End
   End
   Begin SQLPane = 
   End
   Begin DataPane = 
      Begin ParameterDefaults = ""
      End
   End
   Begin CriteriaPane = 
      Begin ColumnWidths = 11
         Column = 1440
         Alias = 900
         Table = 1170
         Output = 720
         Append = 1400
         NewValue = 1170
         SortType = 1350
         SortOrder = 1410
         GroupBy = 1350
         Filter = 1350
         Or = 1350
         Or = 1350
         Or = 1350
      End
   End
End
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vBookmarks'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=1 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vBookmarks'
GO
USE [master]
GO
ALTER DATABASE [MvcWithNG] SET  READ_WRITE 
GO
